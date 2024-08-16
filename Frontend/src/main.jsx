import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Shop from './Pages/Shop.jsx'
import Event from './Pages/Event.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/aboutus',
        element:<About/>
      },
      {
        path:'/events',
        element:<Event/>
      },
      {
        path:'/shop',
        element:<Shop/>
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}>
  <App/>
  </RouterProvider> 
  </React.StrictMode>,
)
