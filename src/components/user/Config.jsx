import React, { useState } from 'react'
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';
import useAuth from '../../hooks/useAuth';

export const Config = () => {

    const [saved, setSaved] = useState('not_saved');

    // consigo mi contexto 
    const {auth} = useAuth();


    const updateUser = (e) =>{
        e.preventDefault();


    }

  return (
    <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Editar informacion</h1>
            </header>

            {saved == 'saved' ? <strong className='alert alert-success'>Usuario actualizado correctamente </strong> : ''}
            {saved == 'error' ? <strong className='alert alert-danger'>Usuario NO actualizado correctamente </strong> : ''}


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
            </div>
        </>
  )
}
