import * as React from 'react'

/**
 * Sync scroll positions between multiple refs.
 */
export function useScrollSync(
  ...refs: Array<{ current?: HTMLElement | null }>
) {
  const timeoutId = React.useRef<ReturnType<typeof setTimeout>>(null)
  const handleScroll = React.useCallback(event => {
    const syncedRefs = refs.filter(ref => ref.current !== event.target)
    const targetScrollLeft = event.target.scrollLeft

    clearTimeout(timeoutId.current)

    syncedRefs.forEach(ref => {
      removeEvent(ref)
      ref.current.style.willChange = 'scroll-position'
      ref.current.scrollLeft = targetScrollLeft
    })

    timeoutId.current = setTimeout(() => {
      syncedRefs.forEach(ref => {
        addEvent(ref)
        ref.current.style.willChange = ''
      })
    }, 100)
  }, refs)

  const addEvent = React.useCallback(
    ref => {
      ref.current.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    },
    [handleScroll]
  )

  const removeEvent = React.useCallback(
    ref => {
      ref.current.removeEventListener('scroll', handleScroll, {
        passive: true,
      })
    },
    [handleScroll]
  )

  React.useLayoutEffect(() => {
    refs.forEach(addEvent)
    return () => {
      clearTimeout(timeoutId.current)
      refs.forEach(removeEvent)
    }
  }, refs)
}
