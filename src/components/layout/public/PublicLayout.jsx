import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Header } from './Header'

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {/* layout*/}
      <Header />

      {/* section layout content  */}
      {/* si el usuario esta identificado que no pueda entrar a la seccion publica de login y registro y hacemos un navigate */}
      <section className="layout__content">
        {!auth._id ?
          <Outlet />
          :
          <Navigate to='/social' />
        }

      </section>

    </>
  )
}
