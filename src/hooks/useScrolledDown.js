import { useRef, useLayoutEffect } from 'react'

function getScrolledDown() {
  if (typeof window === 'undefined') return false
  return window.scrollY > 100 ? true : false
}

export default function useScrolledDown(effect) {
  const offset = 100 // Pixels to scroll before we condired scrolled to be true
  const throttle = 500 // Millisecond to throttle callback to avoid perf issues

  let throttleTimeout = null

  const callBack = () => {
    if (typeof window === 'undefined') effect(false)
    effect(window.scrollY > offset ? true : false)
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(callBack, throttle)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })
}
