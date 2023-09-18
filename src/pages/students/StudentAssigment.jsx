import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../components/common/Table';
import { useForm } from '../../hooks/useForm';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const StudentAssigment = () => {
    let { id } = useParams();

    const [dataFetch, setDataFetchs] = useState([])
    const [coursesAssig, setCoursesAssig] = useState([])
    const [updateForm, setupdateForm] = useState(false);

    const { section, id_course, onResetForm, forceChange, formState, onInputChange, bulkForceChange } = useForm(
        { id_course: -1, section: 1 })

    const getCourses = () => {
        fetch(backendURL + "courses")
            .then(res => res.json())
            .then(data => {
                const tmp = data.filter(el =>
                    !coursesAssig.some(item => item.id === el.id)
                );
                setDataFetchs(tmp)
            }).catch(err => { })
    }

    useEffect(() => {
        fetch(backendURL + `courses/${id}`)
            .then(res => res.json())
            .then(data => {
                getCourses()
                setCoursesAssig(data)
            }).catch(err => { })
    }, [updateForm])

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (id_course <= 0) {
            alert("Ingrese un curso valido")
            return
        }
        fetch(backendURL + "student/assign", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_course, section, id_student: id
            })
        })
            .then(res => {
                if (res.status == 201) {
                    alert("Entidad guardada")
                } else {
                    alert("Error al guardar entidad intente de nuevo")
                }
            })
            .catch(err => alert("Error al guardar entidad")).finally(() => {
                setupdateForm(!updateForm)
                onResetForm()
            })
    }

    const onDelete = (ev) => {
        fetch(backendURL + `student/remove/${id}/${ev}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
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
        <h1 className='text-white font-serif font-bold m-10'>ASIGNAR CURSO A ESTUDIANTE</h1>
        <form onSubmit={onSubmit} className='m-10'>
            <select
                onChange={(ev) => onInputChange(ev)}
                value={id_course}
                name="id_course" id="id_course"
                className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
                <option key="-1" value={-1}>Seleccione un curso</option>
                {dataFetch.map(el => {
                    return (
                        <option value={el.id} key={el.id}>{el.name}</option>
                    )
                })}
            </select>

            <label htmlFor="section" className='text-white mb-5'>
                Seccion
            </label>

            <select
                onChange={(ev) => onInputChange(ev)}
                value={section}
                name="section" id="section"
                className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
                <option value={1} key={1}>A</option>
                <option value={2} key={2}>B</option>
                <option value={3} key={3}>C</option>
                <option value={4} key={4}>D</option>
            </select>

            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                Confirmar
            </button>
        </form>

        <Table
            dataFetch={coursesAssig}
            headers={["#", "Nombre"]}
            keys={["id", "name"]}
            remove={true}
            key_ref='id'
            onDelete={onDelete}
        />

    </>
}
