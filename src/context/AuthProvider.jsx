import React, { createContext, useState, useEffect } from 'react';
import { Global } from '../helpers/Global';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    // estado que contendra la info del usuario para compartir con todos los componentes 

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    // comprobara los datos del token
    useEffect(() => {
        authUser();
    }, []);

    // funcion que traera todo el contexto que queremos compartir
    const authUser = async() => {

        //sacar datos del usuario identificado del LocalS
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        //comprobar si tengo el token y el user
        if( !token || !user ){
            setLoading(false);
            return false;
        }

        //transfromar los datos del obj a javascript
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        //hacer peticion ajax al backend que me compruebe el token
        //y que me devuelva los datos del user
        const request = await fetch(Global.url + 'user/profile/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await request.json();

        // peticion para los contadores
        const requestCounters = await fetch(Global.url + 'user/counters/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const dataCounters = await requestCounters.json();

        //setear el estado de auth
        setAuth(data.user);
        setCounters(dataCounters);
        setLoading(false);
    }

    return (<AuthContext.Provider
        value={{
            auth,
            setAuth,
            counters,
            setCounters,
            loading,
            setLoading
        }}
    >

        {children}

    </AuthContext.Provider>)
}

export default AuthContext;
