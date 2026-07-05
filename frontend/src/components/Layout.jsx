import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useLocation, Outlet, useLoaderData } from "react-router"
import { getLoggedInProfile } from "../utils"

export async function loader() {
    const loggedInProfile = await getLoggedInProfile()
    return loggedInProfile
}

export default function Layout() {
    const location = useLocation().pathname
    const title = document.getElementsByTagName("title")[0]

    const loaderData = useLoaderData()
    console.log(loaderData)

    React.useEffect(() => {
        if (location === "/") {
            title.textContent = "Home"
        } else {
            title.textContent = (`${location.slice(1, 2).toUpperCase()}${location.slice(2, location.length)}`)
        }
    }, [location])

    return (
        <>
            <div className={location === "/" ? "h-m-container" : "p-m-container"}>
                {
                    <Header
                        isLoggedIn={loaderData.profile_logged_in ? true : false}
                        profileId={loaderData.profile_logged_in}
                    />
                }
                <main>
                    {<Outlet />}
                </main>
            </div>
            {window.location.pathname !== "/publications" && <Footer />}
        </>
    )
}