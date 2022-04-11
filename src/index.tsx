import { createRoot } from 'react-dom/client'

import App from './components/Model'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<App />)
}