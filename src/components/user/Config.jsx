import React, { useState } from 'react'
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';
import useAuth from '../../hooks/useAuth';
import { SerializeForm } from '../../helpers/SerializeForm';

export const Config = () => {

    const [saved, setSaved] = useState('not_saved');

    // consigo mi contexto 
    const {auth, setAuth} = useAuth();


    const updateUser = async(e) =>{
        e.preventDefault();

        // token de autenticacion 
        const token = localStorage.getItem('token');
        
        // recoger datos del formulario con el helper
        let newDataUser = SerializeForm(e.target);

        // borro el dato file0 que no me sirve 
        delete newDataUser.file0;   

        // guardar y actualizar usuario en la BD 
        const request = await fetch(Global.url + 'user/update', {
            method: 'PUT',
            body: JSON.stringify(newDataUser),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token
            }
        });

        const data = await request.json();

        if(data.status == 'success' && data.user){
            delete data.user.password;
            setAuth(data.user);
            setSaved('saved');
        }else{
            setSaved('error');
        }

        // subida de imagenes 
        const fileInput = document.querySelector('#file');
        if(data.status == 'success' && fileInput.files[0]){

            // recoger imagen a subir 
            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            // peticion para enviar la img al backend 
            const uploadRequest = await fetch(Global.url + 'user/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: token
                }
            });

            const uploadData = await uploadRequest.json();

            if(uploadData.status == 'success' && uploadData.user){

                delete uploadData.user.password;

                setAuth(uploadData.user);
                setSaved('saved');
            }else{
                setSaved('error');
            }

        }

    }

  return (
    <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Editar informacion</h1>
            </header>

            {saved == 'saved' ? <strong className='messages_edit_user alert alert-success'>Usuario actualizado correctamente </strong> : ''}
            {saved == 'error' ? <strong className='messages_edit_user alert alert-danger'>Usuario NO actualizado correctamente </strong> : ''}


            <div className="content__posts">
                
                <form className='config-form' onSubmit={updateUser}>

                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" defaultValue={auth.name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" defaultValue={auth.surname}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" defaultValue={auth.nick}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Biografia</label>
                        <textarea name="bio" defaultValue={auth.bio}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electronico</label>
                        <input type="email" name="email" defaultValue={auth.email}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="*******" name="password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file0">Avatar</label>
                        <div className="general-info__container-avatar">
                            { auth.image != 'default.png' ? 
                            <img src={Global.url + 'user/avatar/' + auth.image} className="container-avatar__img" alt="Foto de perfil" />
                            :
                            <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                            }
                        </div>
                        <br />
                        <input type="file" name="file0" id='file'/>
                    </div>
                    <br/>
                    <input type="submit" value="Registrate" className='btn btn-succes' />

                </form>
                <br />
            </div>
        </>
  )
}
