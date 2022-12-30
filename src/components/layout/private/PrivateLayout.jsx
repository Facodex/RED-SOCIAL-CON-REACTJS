import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const PrivateLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <h1>CARGANDO</h1>;
    } else {
        return (
            <>
                {/* layout*/}

                {/* cabecera */}
                <Header />

                {/* section layout content  */}
                <section className="layout__content">
                    {auth._id ?
                        <Outlet />
                        :
                        <Navigate to='/login' />
                    }
                </section>

                {/* barra lateral  */}
                <Sidebar />
            </>
        )
    }
}
