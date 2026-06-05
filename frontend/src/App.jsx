import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Publications from "./pages/Publications"
import About from "./pages/About"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="publications" element={<Publications />} />
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}