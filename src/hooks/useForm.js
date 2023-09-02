import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const forceChange = (key,value)=>{
      setFormState({...formState,[ key ]: value})
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const bulkForceChange = (newdata) =>{
      setFormState(newdata)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        forceChange,
        bulkForceChange
    }
}