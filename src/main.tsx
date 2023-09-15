import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Root from './routes/Root/root.tsx'
import ErrorPage from './error-page.tsx'
import Calendar from './routes/Calendar/calendar.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:3001/',
  cache: new InMemoryCache(),
})

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
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
