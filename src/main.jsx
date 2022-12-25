import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// importar assets (estilos imagenes fuentes etc )
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/normalize.css';
import './assets/css/styles.css';
import './assets/css/responsive.css';


// arrancamos la app de react 
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
