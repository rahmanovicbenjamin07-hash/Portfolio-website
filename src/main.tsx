import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/fonts'
import './styles/global.css'
import App from './App'
import { startSmoothScroll } from './smoothScroll'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// Built pages arrive prerendered (scripts/prerender.mjs): hydrate them. The dev server sends an empty root.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)

startSmoothScroll()
