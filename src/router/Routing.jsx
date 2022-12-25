import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';


export const Routing = () => {
  return (

    <BrowserRouter>

        <Routes>

            {/* layout public  */}
            <Route path="/" element={<PublicLayout/>}>
                <Route index element={<Login/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='registro' element={<Register/>}></Route>
            </Route>

        </Routes>

    </BrowserRouter>

  )
}
