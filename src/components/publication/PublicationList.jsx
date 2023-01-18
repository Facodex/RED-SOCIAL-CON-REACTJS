import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';


export const PublicationList = ({publications, getPublications, page, setPage, more, setMore}) => {

    const {auth} = useAuth();

    // metodo nextPage para mostrar mas publicaciones 
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    const deletePublication = async(publicationId) => {
        const request = await fetch(Global.url + 'publication/remove/' + publicationId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if(data.status == 'success'){
            getPublications(1, true);
            setPage(1);
            setMore(true);
        }
    }

    return (
        <>
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
                                    <a href="#" className="user-info__create-date"><ReactTimeAgo date={publication.created_at} locale='es-ES'/></a>
                                </div>

                                <h4 className="post__content">{publication.text}</h4>

                                {publication.file && <img src={Global.url + 'publication/media/' + publication.file} />}

                            </div>

                        </div>


                        {/* que se muestre el boton borrar solo si eres el creador de la publicacion  */}
                        {auth._id == publication.user._id &&
                            <div className="post__buttons">

                                <button onClick={() => deletePublication(publication._id)} className="post__button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>

                            </div>
                        }


                    </div>
                )
                    :
                    <h1>NO HAY PUBLICACIONES</h1>
                }



            </div>

            { more && 
                <div className="content__container-btn">
                    <button onClick={nextPage} className="content__btn-more-post">
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
