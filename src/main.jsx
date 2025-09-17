import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./media/ClashDisplay_Complete/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css"
import "./media/Switzer_Complete/Switzer_Complete/Fonts/WEB/css/switzer.css"
import { ThemeContext } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeContext>
    <App />
    </ThemeContext>
)
