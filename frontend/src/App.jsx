import React from 'react'
import { Toaster } from "react-hot-toast"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignup from './Pages/CaptainSignup';
import Navbar from './Components/Navbar/Navbar.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Ride from './Components/Ride/Ride.jsx';
import Drive from "./Components/Drive/Drive.jsx"
import Service from "./Components/Service/Service.jsx"
import Contact from "./Components/Contact/Contact.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from './Components/Profile/Profile.jsx';


const App = () => {

  // Create a layout component to avoid repetition
  const MainLayout = ({ children }) => (
    <div>
      <Navbar />
      <Dashboard/>
      {children}
    </div>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '/userlogin',
      element:(
          <UserLogin/>
      )
    },
    {
      path: '/usersignup',
      element:(
          <UserSignup/>
      )
    },
    {
      path: '/profile',
      element:(
        <MainLayout>
          <Profile/>
        </MainLayout>
      )
    },
    {
      path: '/ride',
      element:(
        <MainLayout>
          <Ride/>
        </MainLayout>
      )
    },
    {
      path: '/drive',
      element:(
        <MainLayout>
          <Drive/>
        </MainLayout>
      )
    },
    {
      path: '/services',
      element:(
        <MainLayout>
          <Service/>
        </MainLayout>
      )
    },
    {
      path: '/contact',
      element:(
        <MainLayout>
          <Contact/>
        </MainLayout>
      )
    }
  ]);

  return (
      <GoogleOAuthProvider clientId="311701659558-d14lkfpuudte3sga0em9r2t5spt97551.apps.googleusercontent.com">
     <RouterProvider router={router} />
     <Toaster position="top-right" reverseOrder={false} />
     </GoogleOAuthProvider>
  )
}

export default App
