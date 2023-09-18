import React, { useState } from 'react'
import { Table } from '../../components/common/Table';
import { useEffect } from 'react';
import { tab } from '@testing-library/user-event/dist/tab';
const backendURL = process.env.REACT_APP_BACKEND_URL;

export const UploadData = () => {

    const [table, setTable] = useState(1)
    const [squema, setSquema] = useState({})

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        fetch(backendURL + `upload/${table}`)
            .then(res => res.json())
            .then(data => {
                setSquema(data)
            })
    }, [table])


    const onChange = ({ target }) => {
        setTable(target.value)
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (!file) {
            return;
        }
       
        const form = new FormData();
        form.append("file",file)

        fetch(backendURL + `upload/${squema.table}`, {
            method: 'POST',
            body: form,
        })
            .then(res => res.json())
            .then(data => { })
            .catch(err => {
                alert("Error al subir archivo, verifique el formato")
            })
    }

    return <>
        <div className='flex items-center justify-center'>

            <form onSubmit={(ev) => onSubmit(ev)} className='grid grid-cols-2 gap-4 w-9/12 grid-flow-row'>
                <div className=''>
                    <select
                        onChange={(ev) => onChange(ev)}
                        value={table}
                        name="section" id="section"
                        className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value="1">Salones</option>
                        <option value="2">Curso</option>
                        <option value="3">Maestros</option>
                        <option value="4">Asignación de maestros a cursos</option>
                        <option value="5">Estudiantes</option>
                        <option value="6">Carrera</option>
                        <option value="7">Asignacion de estudiantes</option>
                    </select>
                </div>

                <div>
                    <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" name='file' id="file_input" type="file" />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Only XLS,XLSX.</p>
                </div>
                <div>
                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                        Subir archivo
                    </button>
                </div>
            </form>
        </div>

        <div className='m-10'>
            {squema.columns && <Table
                dataFetch={squema?.columns}
                headers={["Columna", "Tipo de dato", "Llave primaria (Si/No)", "LLave Foranea (Si/No)"]}
                keys={["name", "type", "primary", "foreign"]}
                key_ref='name'
            />}
        </div>
    </>
}
