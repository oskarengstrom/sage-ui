# useResponsive

A hook with utilities that hook onto the ThemeContext.

If no `theme.bp` is found, it falls back to general breakpoint settings.

Usage:

```
const { isMobile, breakpoint, breakpointIndex } = useResponsive()
```

### isMobile

Shows `true | false` if the device is registered as a phone.

This is done by matching userAgent and NOT by looking at screen width. Use `breakpoint` for that.

### breakpoint

Shows the current screen width as a string ("sm" | "md" | "lr" | "xl").

### breakpointIndex

Shows the current screen width as a number (0 | 1 | 2 | 3).
