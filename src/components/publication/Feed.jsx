import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { PublicationList } from '../publication/PublicationList';

export const Feed = () => {

    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        getPublications(1, false);
    }, []);


    // metodo para devolver publicaciones en perfil 
    const getPublications = async (nextPage = 1, showNews) => {

        if (showNews){
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }


        const request = await fetch(Global.url + 'publication/feed/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            let newPublications = data.publications;

            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            setPublications(newPublications);

            // comprobamos si hay mas publicaciones que mostrar o ya no 
            if (!showNews && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
        }
    }


    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
            </header>

            <PublicationList
                publications={publications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                getPublications={getPublications}
            />

        </section>
    )
}
