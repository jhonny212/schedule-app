import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../common/Table';
import { Modal } from '../common/Modal';
import { useForm } from '../../hooks/useForm';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const ProfessorAssigments = () => {

    let { cui } = useParams();
    const [assigments, setAssigments] = useState([])
    const [courses, setCourses] = useState([])
    const [isActive, setisActive] = useState(false);
    const [updateForm, setupdateForm] = useState(false);
    const { id_course,flag, onResetForm, forceChange, formState, onInputChange, bulkForceChange } = useForm(
        {id_course: -1, flag: true, id_professor: cui})

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(id_course == -1) {
            alert("Seleccione un curso")
            return
        }
        const data = {
            course: {
                id: id_course,
                semester: 0,
                name: ''
            },
            professor: {
                cui,
                name: '',
                hour_start: "22:47:16.114Z",
                hour_end: "22:47:16.114Z"
            },
            flag
        }
        
        
        fetch(backendURL + "professor/assignment",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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

    async function getAssigments() {

        const data = await (await fetch(backendURL + `professor/${cui}`)).json();
        setAssigments(data.map(({ course, professor, flag }) => {
            return {
                professor: professor.name,
                course: course.name,
                id_course: course.id,
                semester: course.semester,
                flag: flag ? 'Si' : 'No',
            }
        }))

        const coursesData = await (await fetch(backendURL + `courses/`)).json();
        const tmp = coursesData.filter(el =>
            !assigments.some(item => item.id_course === el.id)
        );
        setCourses(tmp)

    }

    const onDelete = (id)=>{
       
        fetch(backendURL + "professor/assignment",{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course: {
                    id: id,
                    semester: 0,
                    name: ''
                },
                professor: {
                    cui,
                    name: '',
                    hour_start: "22:47:16.114Z",
                    hour_end: "22:47:16.114Z"
                },
                flag
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

    useEffect(() => {
        getAssigments();
    }, [updateForm])

    return <>

        <button
            onClick={() => setisActive(!isActive)}
            data-modal-target="authentication-modal"
            className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-4 ml-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Agregar asignación
            </span>
        </button>

        {isActive &&
            <Modal setisActive={setisActive} >
                <form method='POST' onSubmit={onSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="id_course" className='text-white mb-5'>
                            Curso
                        </label>
                        <select name="id_course" id="id_course"
                            onChange={(ev) => onInputChange(ev)}
                            className='block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            <option key="-1" value={-1}>Seleccione un curso</option>

                            {courses.map(el => {
                                return (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>

                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input id="flag" name='flag' type="checkbox"
                            checked = {flag ?'checked': '' }
                            onChange={(ev) => forceChange('flag', !flag)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="flag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioridad</label>
                    </div>

                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                        Confirmar
                    </button>
                </form>
            </Modal>
        }


        <Table
            dataFetch={assigments}
            headers={["Profesor", "Curso", "Semestre", "Prioridad"]}
            keys={["professor", "course", "semester", "flag"]}
            remove={true}
            key_ref='id_course'
            onDelete={onDelete}
        />
    </>
}
