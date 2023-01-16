import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import avatar from '../../assets/img/user.png';
import { GetProfile } from '../../helpers/GetProfile';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';


export const Profile = () => {

    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const params = useParams();
    const { auth } = useAuth();

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications();
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications();
    }, [params]);

    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, setUser);
        if (dataUser.following && dataUser.following._id) setIFollow(true);
    }

    const getCounters = async () => {

        const request = await fetch(Global.url + 'user/counters/' + params.userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.following) {
            setCounters(data);
        }
    }

    const follow = async (userId) => {
        // peticion al backend 
        const request = await fetch(Global.url + 'follow/save', {
            method: 'POST',
            body: JSON.stringify({ followed: userId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            // actualizar el following state para agregarle el nuevo follow 
            setIFollow(true);
        }

    }

    const unFollow = async (userId) => {
        // peticion al backend 
        const request = await fetch(Global.url + 'follow/unfollow/' + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }

        });

        const data = await request.json();


        // actualizar el following state para sacarle el follow que dejamos de seguir 
        if (data.status == 'success') {
            setIFollow(false);
        }
    }


    // metodo para devolver publicaciones en perfil 
    const getPublications = async (nextPage = 1) => {
        const request = await fetch(Global.url + 'publication/user/' + params.userId + '/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            let newPublications = data.publications;

            if( publications.length >= 1){
                newPublications = [...publications, ...data.publications];
            }

            setPublications(newPublications);
        }
    }

    // metodo nextPage para mostrar mas publicaciones 
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    return (
        <section className="layout__content">

            {/* aside profile user  */}
            <header className="aside__profile-info">

                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                        {user.image != 'default.png' ?
                            <img src={Global.url + 'user/avatar/' + user.image} className="container-avatar__img" alt="Foto de perfil" />
                            :
                            <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                        }
                    </div>

                    <div className="general-info__container-names">
                        <div>
                            <h1 href="#" className="container-names__name">{user.name} {user.surname}</h1>

                            {user._id !== auth._id &&
                                (iFollow ?
                                    <button className="content__button content__button--right content__button--red" onClick={() => unFollow(user._id)}>Dejar de seguir</button>
                                    :
                                    <button className="content__button content__button--right content__button--green" onClick={() => follow(user._id)}>Seguir</button>
                                )
                            }

                        </div>

                        <h2 className="container-names__nickname">{user.nick}</h2>
                        <p>{user.bio}</p>
                    </div>
                </div>

                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={"/social/siguiendo/" + user._id} className="following__link">
                            <span className="following__title">Siguiendo</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>

                    <div className="stats__following">
                        <Link to={"/social/seguidores/" + user._id} className="following__link">
                            <span className="following__title">Seguidores</span>
                            <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                        </Link>
                    </div>

                    <div className="stats__following">
                        <Link to={'/social/perfil/' + user._id} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>

                </div>

            </header>


            <div className="content__posts">

                {publications ? publications.map(publication =>
                    <div className="posts__post" key={publication._id}>

                        <div className="post__container">

                            <div className="post__image-user">
                                <Link to={'/social/perfil/' + publication.user._id} className="post__image-link">
                                    {publication.user.image != 'default.png' ?
                                        <img src={Global.url + 'user/avatar/' + publication.user.image} className="post__user-image" alt="Foto de perfil" />
                                        :
                                        <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                    }
                                </Link>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">{publication.user.name} {publication.user.surname}</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">{publication.created_at}</a>
                                </div>

                                <h4 className="post__content">{publication.text}</h4>

                            </div>

                        </div>


                        {/* que se muestre el boton borrar solo si eres el creador de la publicacion  */}
                        {auth._id == publication.user._id &&
                            <div className="post__buttons">

                                <a href="#" className="post__button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </a>

                            </div>
                        }


                    </div>
                )
                    :
                    <h1>NO HAY PUBLICACIONES</h1>
                }



            </div>

            <div className="content__container-btn">
                <button onClick={nextPage} className="content__btn-more-post">
                    Ver mas publicaciones
                </button>
            </div>

        </section>
    )
}
