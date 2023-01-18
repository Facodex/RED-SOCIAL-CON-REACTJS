import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';

export const UserList = ({ users, getUsers, following, setFollowing, more, page, setPage }) => {

    const { auth } = useAuth();

    // si activo los if() en follow y unFollow tengo un problema que el estado de following no se me actualiza reactivamente y los botones
    // de seguir y dejar de seguir no me cambian instantaneamente, por eso comente los if()

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
        setFollowing([...following, userId]);
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
        // actualizar el following state para agregarle el nuevo follow 

        let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
        setFollowing(filterFollowings);
        }
    }

    
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next)
    }


    return (

        <>

            <div className="content__posts">

                {users ? users.map(user => (

                    <article className="posts__post" key={user._id}>

                        <div className="post__container">

                            <div className="post__image-user">
                                <Link to={'/social/perfil/'+user._id} className="post__image-link">
                                    {user.image != 'default.png' ?
                                        <img src={Global.url + 'user/avatar/' + user.image} className="post__user-image" alt="Foto de perfil" />
                                        :
                                        <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                    }
                                </Link>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <Link to={'/social/perfil/'+user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                    <span className="user-info__divider"> | </span>
                                    <Link to={'/social/perfil/'+user._id} className="user-info__create-date"> <ReactTimeAgo date={user.created_at} locale='es-ES'/> </Link>
                                </div>

                                <h4 className="post__content">{user.bio}</h4>

                            </div>

                        </div>

                        {user._id !== auth._id &&
                            <div className="post__buttons">

                                {!following.includes(user._id) ?
                                    <button className="post__button post__button--green" onClick={() => follow(user._id)}>
                                        seguir
                                    </button>
                                :

                                    <button className="post__button" onClick={() => unFollow(user._id)}>
                                        dejar de seguir
                                    </button>
                                }
                            </div>
                        }

                    </article>

                ))

                    :

                    <h1>Cargando</h1>

                }

            </div>

            {more &&

                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>

            }

        </>
    )
}
