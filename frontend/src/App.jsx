import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Publications from "./pages/wall/Publications"
import WallPublications, {loader as wallPublicationsLoader} from "./pages/wall/WallPublications"
import WallPublicationDetail, { loader as wallPublicationDetailLoader } from "./pages/wall/WallPublicationDetail"
import PublicationDetail, { loader as publicationDetailLoader } from "./pages/profile/PublicationDetail"
import ProfilePublications, {loader as profilePublicationsLoader} from "./pages/profile/ProfilePublications"
import Register, { action as registerAction } from "./pages/Register"
import Login, { action as loginAction } from "./pages/Login"
import Logout from "./pages/Logout"
import Error from "./components/Error"
import ProfileDetails, { action as publicationAction } from "./pages/profile/ProfileDetails"


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="publications" element={<Publications />}>
      <Route index element={<WallPublications />} loader={wallPublicationsLoader} />
      <Route path=":id" element={<WallPublicationDetail />} loader={wallPublicationDetailLoader} />
    </Route>
    <Route path="register" element={<Register />} action={registerAction} errorElement={<Error />} />
    <Route path="login" element={<Login />} action={loginAction} />
    <Route path="logout" element={<Logout />} />
    <Route path="profile/details" element={<ProfileDetails />} action={publicationAction}>
      <Route index element={<ProfilePublications />} loader={profilePublicationsLoader} />
      <Route path=":id" element={<PublicationDetail />} loader={publicationDetailLoader} />
    </Route>
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}