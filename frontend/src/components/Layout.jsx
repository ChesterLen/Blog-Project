import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import { useLocation } from "react-router-dom"

export default function Layout() {
    const location = useLocation().pathname
    const title = document.getElementsByTagName("title")[0]

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
                <Header />
                <Main />
            </div>
            <Footer />
        </>
    )
}