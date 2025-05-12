import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Event from './Pages/Event.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import AllEvents from './Pages/AllEvents.jsx'
import CreateEvent from './Pages/CreateEvent.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import Unauthorized from './Pages/Unauthorised.jsx'
import Profile from './Pages/Profile.jsx'
import EditEvent from './Pages/EditEvent.jsx'
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
        path:'/register',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/forgotpassword',
        element:<ForgotPassword/>
      },
      {
        path:'/events',
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Organizer", "Student"]}>
            <AllEvents />
          </ProtectedRoute>
        ),
        children:[
          {
            path:'create',
            element:(
                <CreateEvent />
            )
          },
                  
        ]
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/events/edit/:eventId",
        element:<EditEvent/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
  </React.StrictMode>
)
