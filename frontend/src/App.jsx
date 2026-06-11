import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Publications from "./pages/Publications"
import Register, { action as registerAction } from "./pages/Register"
import Error from "./components/Error"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="publications" element={<Publications />} />
    <Route path="register" element={<Register />} action={registerAction} errorElement={<Error />} />
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}