import React from 'react'
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm'
import { useState } from 'react';

export const Register = () => {

    // importo y guardo el hook userForm
    const {form, changed} = useForm({});
    const [saved, setSaved] = useState("Not_sended");

    // funcion guardar usuario nuevo 
    const saveUser = async(e) => {
        e.preventDefault();

        let newUser = form;
        console.log(newUser);

        // guardar usuario en el backend 
        // poner la url correcta de la API y el endpoint y opciones
        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"                
            }
        });

        const data = await request.json();
        
        if(data.status == 'success'){
            setSaved('saved');
        }else{
            setSaved('error');
        }

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">REGISTRO</h1>
            </header>

            <div className="content__posts">

                {saved == 'saved' ? <strong className='alert alert-success'>Usuario registrado correctamente </strong> : ''}
                {saved == 'error' ? <strong className='alert alert-danger'>Usuario NO registrado </strong> : ''}

                <form className='register-form' onSubmit={saveUser}>

                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" onChange={changed} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" onChange={changed}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" onChange={changed}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electronico</label>
                        <input type="email" name="email" onChange={changed}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={changed}/>
                    </div>

                    <input type="submit" value="Registrate" className='btn btn-succes' />

                </form>
            </div>
        </>

    )
}
