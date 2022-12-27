import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const PrivateLayout = () => {
    return (
        <>
            {/* layout*/}

            {/* cabecera */}
            <Header />

            {/* section layout content  */}
            <section className="layout__content">
                <Outlet />
            </section>

            {/* barra lateral  */}
            <Sidebar/>
        </>
    )
}
