import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Wall, { loader as wallLoader, action as wallAction } from "./pages/wall/Wall"
import PublicationDetail, { loader as publicationDetailLoader, action as publicationDetailAction } from "./pages/PublicationDetail"
import Register, { action as registerAction } from "./pages/Register"
import Login, { action as loginAction } from "./pages/Login"
import Logout from "./pages/Logout"
import Error from "./components/Error"
import ProfileDetails, { action as publicationAction, loader as profileLoader } from "./pages/profile/ProfileDetails"
import ProfileSettings from "./pages/profile/ProfileSettings"
import ProfileEdit, { loader as profileEditLoader, action as profileEditAction } from "./pages/profile/ProfileEdit"
import AccountSettings from "./pages/profile/AccountSettings"


const router = createBrowserRouter(createRoutesFromElements(
  <Route id="layout" element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="publications" element={<Wall />} loader={wallLoader} action={wallAction} />
    <Route path="publications/detail/:id" element={<PublicationDetail />} loader={publicationDetailLoader} action={publicationDetailAction} />
    <Route path="register" element={<Register />} action={registerAction} errorElement={<Error />} />
    <Route path="login" element={<Login />} action={loginAction} />
    <Route path="logout" element={<Logout />} />
    <Route path="profile/details/:id" element={<ProfileDetails />} action={publicationAction} loader={profileLoader}>
    </Route>
    <Route path="profile/settings/:id" element={<ProfileSettings />}>
      <Route index element={<ProfileEdit />} loader={profileEditLoader} action={profileEditAction} />
      <Route path="account" element={<AccountSettings />} />
    </Route>
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}