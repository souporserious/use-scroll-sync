# useScrollSync

Sync scroll positions between multiple elements.

<small>Note, if the main thread is too busy or the user's battery is low, scrollbars can get out of sync.</small>

## Install

```bash
yarn add use-scroll-sync
```

```bash
npm install use-scroll-sync
```

## Example

```jsx
import * as React from 'react'
import { useScrollSync } from 'use-scroll-sync'

function SyncedScrollbars() {
  const headerRef = React.useRef()
  const mainRef = React.useRef()
  useScrollSync(headerRef, mainRef)
  return (
    <div>
      <header ref={headerRef}>...</header>
      <main ref={mainRef}>...</main>
    </div>
  )
}
```
