import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //vaciar el localStorage    
        localStorage.clear();

        //setear estados globales a vacios
        setAuth({});
        setCounters({});
        
        // navigate a login 
        navigate('/login');
    }, []);

  return (
    <div>Cerrando sesion...</div>
  )
}
