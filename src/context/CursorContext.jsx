import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CursorContext = createContext(null)

/**
 * Drives the custom "signal cursor". Any component can call
 * setCursor({ label, variant }) on mouse enter and clearCursor() on leave
 * to change what the cursor shows/looks like — used for magnetic buttons,
 * tilt cards, and nav links so the cursor always reflects what's underneath it.
 */
export function CursorProvider({ children }) {
  const [cursor, setCursorState] = useState({ label: '', variant: 'default' })

  const setCursor = useCallback((next) => setCursorState((c) => ({ ...c, ...next })), [])
  const clearCursor = useCallback(() => setCursorState({ label: '', variant: 'default' }), [])

  const value = useMemo(() => ({ cursor, setCursor, clearCursor }), [cursor, setCursor, clearCursor])

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export const useCursor = () => useContext(CursorContext)
