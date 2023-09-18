import React from 'react'
import { SimpleTableList } from '../../components/common/SimpleTableList'
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { Table } from '../../components/common/Table';
import { useEffect } from 'react';
import { Modal } from '../../components/common/Modal';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const StudentsList = () => {
    const [isActive, setisActive] = useState(false);
    const [updateForm, setupdateForm] = useState(false);
    const [careers, setCareers] = useState([])
    const { name, carnet, semester, id_career, onResetForm, forceChange, formState, onInputChange, bulkForceChange } = useForm(
        { name: '', carnet: 0, semester: 1, career: '', id_career: -1 })

    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(backendURL + `career`).then(el => el.json())
            .then(data => {
                setCareers(data)
            })

        fetch(backendURL + `student`).then(el => el.json()).
            then(data => {
                setStudents(data.map(({ carnet, name, semester, career }) => {
                    return {
                        name, carnet, semester, career: career.name,id_career:career.code
                    }
                }))
            })

    }, [updateForm])

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (id_career == -1) {
            alert("Seleccione una carrera")
            return
        }
        fetch(backendURL + "student/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                carnet,
                name,
                semester,
                career: {
                    code: id_career,
                    name: "",
                    extension: 0
                }
            })
        })
            .then(res => {
                if (res.status == 201) {
                    alert("Entidad guardada")
                } else {
                    alert("Error al guardar entidad intente de nuevo")
                }
            })
            .catch(err => alert("Error al guardar entidad"))
            .finally(() => {
                setisActive(false)
                setupdateForm(!updateForm)
                onResetForm()
            })
    }

    const onEdit = async (item) => {
        setisActive(true)
        console.log(item);
        bulkForceChange(item[0])
    }

    const onDelete = (id) => {
        fetch(backendURL + "student", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                carnet,
                name,
                semester,
                career: {
                    code: id_career,
                    name: "",
                    extension: 0
                }
            })
        })
            .then(res => {
                if (res.status == 200) {
                    alert("Entidad eliminada")
                } else {
                    alert("Error al eliminada entidad intente de nuevo")
                }
            })
            .catch(err => alert("Error al eliminada entidad"))
            .finally(() => {
                setupdateForm(!updateForm)
            })
    }

    return <>
        <button
            onClick={() => setisActive(!isActive)}
            data-modal-target="authentication-modal"
            className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-4 ml-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Agregar estudiante
            </span>
        </button>

        {isActive &&
            <Modal setisActive={setisActive} >
                <form method='POST' onSubmit={onSubmit}>
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
                        <input type="number" name="carnet" id="carnet"
                            value={carnet}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Carnet
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="number" name="semester" id="semester"
                            value={semester}
                            onChange={(ev) => onInputChange(ev)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Semestre
                        </label>
                    </div>

                    <select name="id_career" id="id_career"
                        onChange={(ev) => onInputChange(ev)}
                        value={id_career}
                        className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option key="-1" value={-1}>Seleccione una carrera</option>
                        {careers.map(el => {
                            return (
                                <option key={el.code} value={el.code}>{el.name}</option>
                            )
                        })}
                    </select>

                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                        Confirmar
                    </button>
                </form>
            </Modal>
        }

        <Table
            dataFetch={students}
            headers={["Carnet", "Nombre", "Carrera"]}
            keys={["carnet", "name", "career"]}
            remove={true}
            key_ref='carnet'
            onDelete={onDelete}
            onEdit={onEdit}
            detail = {'/students'}
            edit={true}
        />
    </>
}
