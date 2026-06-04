import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

export default function Layout() {
    return (
        <>
            <div className="h-m-container">
                <Header />
                <Main />
            </div>
            <Footer />
        </>
    )
}