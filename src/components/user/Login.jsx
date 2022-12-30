import React from 'react'
import { useState } from 'react';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm'

export const Login = () => {

    // importo el contexto atraves de un hook personalizado
    const {auth, setAuth} = useAuth();

    const {form, changed} = useForm({});
    const [saved, setSaved] = useState("Not_login");

    // funcion para que el usuario haga Login
    const loginUser = async(e) => {
        e.preventDefault();

        // datos del formulario 
        let userToLogin = form;

        // peticion a la api 
        let request = await fetch(Global.url + 'user/login', {
            method: 'POST',
            body: JSON.stringify(userToLogin),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await request.json();

        // comprobar si ingreso o no correctamente 

        if(data.status == 'success'){

            // persistir los datos al navegador
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSaved('login');
            // setear datos en el auth 
            setAuth(data.user);

            //redireccionar a /social
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }else{
            setSaved('error');
        }

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">LOGIN</h1>
            </header>

            {saved == 'login' ? <strong className='alert alert-success'>Usuario identificado correctamente </strong> : ''}
            {saved == 'error' ? <strong className='alert alert-danger'>Usuario NO identificado </strong> : ''}

            <div className="content__posts">

                <form className="login-form" onSubmit={loginUser}>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electronico</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>

                    <input className="btn btn-succes" type="submit" value="Identificate" />
                </form>
            </div>
        </>
    )
}
