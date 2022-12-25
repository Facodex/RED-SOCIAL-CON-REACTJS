import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const PublicLayout = () => {
  return (
    <>
        {/* layout*/}
        <Header/>

        {/* section layout content  */}
        <section className="layout__content">
            <Outlet/>
        </section>

    </>
  )
}
