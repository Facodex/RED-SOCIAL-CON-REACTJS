import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';
import { useParams } from 'react-router-dom';

export const Followers = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const params = useParams();

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (nextPage = 1) => {

        const userId = params.userId;

        //hacer una peticion para sacar usuairos
        const request = await fetch(Global.url + 'follow/followers/' + userId + '/' + nextPage , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        const data = await request.json();

        // recorrer y limpiar follows para quedarme con followed 
        let cleanUsers = [];
        data.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.user]
        });

        data.users = cleanUsers;

        // crear estado para poder listarlos
        if (data.status == 'success' && data.users) {
            let newUsers = data.users;

            if (users.length >= 1) {
                newUsers = [...users, ...data.users];
            }

            setUsers(newUsers);
            setFollowing(data.user_following);


            // paginacion
            if (users.length >= (data.total - data.users.length)) {
                setMore(false);
            }


        }


    }


    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">SEGUIDORES DE NOMBRE</h1>
            </header>

            <UserList users={users} getUsers={getUsers} following={following} setFollowing={setFollowing} more={more} page={page} setPage={setPage} />

            <br />


        </section>
    )
}
