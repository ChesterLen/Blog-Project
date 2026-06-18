import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Publications from "./pages/Publications"
import Register, { action as registerAction } from "./pages/Register"
import Login, { action as loginAction } from "./pages/Login"
import Logout from "./pages/Logout"
import Error from "./components/Error"
import Details from "./pages/profile/Details"


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="publications" element={<Publications />} />
    <Route path="register" element={<Register />} action={registerAction} errorElement={<Error />} />
    <Route path="login" element={<Login />} action={loginAction} />
    <Route path="logout" element={<Logout />} />
    <Route path="profile/details" element={<Details />} />
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}