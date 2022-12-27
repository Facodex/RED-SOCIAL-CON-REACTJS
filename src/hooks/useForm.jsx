import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

    const [form, setForm ] = useState(initialObj);

    // en lugar de pasarle (e) desestructuro y le mando target
    const changed = ({target}) => { 
        const {name, value} = target;

        setForm({
            ...form,
            [name]: value
        });
    }
  return {
    form,
    changed
  }
}

// Hook useForm: Recibira un objeto que lo iremos rellenando
