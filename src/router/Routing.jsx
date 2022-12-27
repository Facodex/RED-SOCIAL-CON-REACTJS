import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';

import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Feed } from '../components/publication/Feed';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';


export const Routing = () => {
  return (

    <BrowserRouter>

      <Routes>

        {/* layout public  */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='registro' element={<Register />}></Route>
        </Route>

        {/* layout private */}
        <Route path="/social" element={<PrivateLayout/>}>
          <Route index element={<Feed/>}></Route>
          <Route path='feed' element={<Feed/>}></Route>
        </Route>

        {/* ruta de error  */}
        <Route path="*" element={<><p><h1>Error 404</h1><Link to="/">Volver al inicio</Link></p></>}></Route>

      </Routes>

    </BrowserRouter>

  )
}
