import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root/root.tsx'
import ErrorPage from './error-page.tsx'
import Calendar from './routes/Calendar/calendar.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.scss'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "calendar",
    element: <Calendar />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
