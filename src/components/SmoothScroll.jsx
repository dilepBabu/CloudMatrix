import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { frame, cancelFrame } from 'framer-motion'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children, enabled = true }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducedMotion) return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    if (lenisRef.current) {
      lenisRef.current.destroy()
      lenisRef.current = null
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      anchors: true,
      autoRaf: false,
    })

    lenis.start()
    lenisRef.current = lenis

    // Sync Lenis through Framer Motion's own frame scheduler, without
    // keepAlive priority, so it never runs ahead of Motion's own
    // animation commits (that was eating the first-load animation frame).
    function syncLenis({ timestamp }) {
      lenis.raf(timestamp)
      frame.update(syncLenis)
    }
    frame.update(syncLenis)

    const recalc = () => lenis.resize()
    document.fonts?.ready.then(recalc)

    const imgs = Array.from(document.querySelectorAll('img'))
    imgs.forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', recalc, { once: true })
    })

    const ro = new ResizeObserver(recalc)
    ro.observe(document.body)

    const t1 = setTimeout(recalc, 500)
    const t2 = setTimeout(recalc, 1500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      ro.disconnect()
      imgs.forEach((img) => img.removeEventListener('load', recalc))
      cancelFrame(syncLenis)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  return children
}