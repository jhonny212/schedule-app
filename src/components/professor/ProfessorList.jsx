import React from 'react'
import { SimpleTableList } from '../common/SimpleTableList'
import { useState } from 'react';

import { Modal } from '../common/Modal';
import { useForm } from '../../hooks/useForm';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const ProfessorList = () => {

    const [isActive, setisActive] = useState(false);
    const [updateForm, setupdateForm] = useState(false);
    const { name, cui,hour_end,hour_start, onResetForm, forceChange, formState, onInputChange, bulkForceChange } = useForm(
        { name: '', cui: 0, hour_start: '13:00:00', hour_end: '13:00:00'})

    const onDelete = (id)=>{
        fetch(backendURL + "professor",{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "hour_end": "13:00:00",
                "hour_start": "13:00:00",
                "cui": id,
                "name": ""
            })
            })
            .then(res => {
                if(res.status == 200){
                    alert("Entidad eliminada")
                }else{
                    alert("Error al eliminada entidad intente de nuevo")
                }
            })
            .catch(err => alert("Error al eliminada entidad"))
            .finally(()=>{
                setupdateForm(!updateForm)
            })
    }

    const onEdit = (item)=>{
        setisActive(true)
        console.log(item);
        bulkForceChange(item[0])
    }

    const onSubmit =(ev)=>{
        ev.preventDefault();
        
        fetch(backendURL + "professor",{
            method: formState.cui === -1?'POST':'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
            })
            .then(res => {
                if(res.status == 201){
                    alert("Entidad guardada")
                }else{
                    alert("Error al guardar entidad intente de nuevo")
                }
            })
            .catch(err => alert("Error al guardar entidad"))
            .finally(()=>{
                setisActive(false)
                setupdateForm(!updateForm)
                onResetForm()
            })
    }

    return <>
        <button
            onClick={() => setisActive(!isActive)}
            data-modal-target="authentication-modal"
            className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-4 ml-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Agregar profesor
            </span>
        </button>

        {isActive &&
            <Modal setisActive={setisActive} >
                <form onSubmit={onSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="name" id="name"
                            value={name}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="time" name="hour_start" id="hour_start"
                            value={hour_start}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="hour_start" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Hora Inicio
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="time" name="hour_end" id="hour_end"
                            value={hour_end}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="hour_end" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Hora Fin
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="number" name="cui" id="cui"
                            value={cui}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="cui" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cui
                        </label>
                    </div>

                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                        Confirmar
                    </button>
                </form>
            </Modal>
        }

        <SimpleTableList edit={true} reload={updateForm} remove={true} url={'professor'} headers={
            ['Cui', 'Nombre', 'Hora Inicio de contratación', 'Hora Final de contratación']
        } keys={['cui', 'name', 'hour_start', 'hour_end']}
            key_ref='cui'
            onDelete={onDelete}
            onEdit={onEdit}
            detail={"professor"}
        />
    </>
}
