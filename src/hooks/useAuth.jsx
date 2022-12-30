import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;

// este hook retornara el hook useContext junto con el contexto creado llamado AuthContext