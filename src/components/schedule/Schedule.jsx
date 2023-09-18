import React, { useEffect, useState } from 'react'
import { ClassroomHeader } from '../classroom/ClassroomHeader';
import { RowSchedule } from '../rowSchedule/RowSchedule';
import { Spinner } from '../common/Spinner';

const backendURL = process.env.REACT_APP_BACKEND_URL;


export const Schedule = () => {

    const [classRooms, setclassNameRooms] = useState([])
    const [scheduleData, setScheduleData] = useState([])
    const [sheduleNotRegistered, setSheduleNotRegistered] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [type, setType] = useState("")

    useEffect(() => {
        setisLoading(true)
        fetch(backendURL + "classrooms")
            .then(res => res.json())
            .then(data => {
                setclassNameRooms(data)
            }).catch(err => { })

        fetch(backendURL + `schedule/${type}`)
            .then(res => res.json())
            .then(data => {
                let notRegistered = []
                data.forEach(el => {
                    const tmp = el.filter(el2 => el2.classroom == undefined)
                    if (tmp.length > 0) {
                        notRegistered = notRegistered.concat(tmp)
                    }
                })
                
                setSheduleNotRegistered(notRegistered)
                setScheduleData(data)
                setisLoading(false)
            }).catch(err => { })
    }, [type])


    return <>

        <select name="i" id=""
            className='block w-1/3 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(el)=>{
                setType(el.target.value)
            }}
        >
            <option key="2" value="">Por Asignacion</option>
            <option key="3" value={2}>Por Horario de contratación</option>
            <option key="4" value={3}>Por cursos</option>
            <option key="5" value={4}>Por estudiantes</option>
            <option key="5" value={5}>Si prioridad</option>
        </select>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table id='table-schedule' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Hora
                        </th>
                        {classRooms.map(data => {
                            return <ClassroomHeader key={data.id} classroom={data} />
                        })}
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map((data, index) => {
                        return <RowSchedule key={index} classrooms={classRooms} data={data} />
                    })}
                </tbody>
            </table>
        </div>

        <div className='mt-10'>
            <h1 className="mb-10 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Cursos no cargados por falta de salones
            </h1>
            <div id="detailed-pricing" className="w-full overflow-x-auto">
                <div className="overflow-hidden min-w-max">
                    <div className="grid grid-cols-5 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <div className="flex items-center">Hora</div>
                        <div>Semestre</div>
                        <div>Profesor</div>
                        <div>Curso</div>
                        <div>Cantidad de alumnos</div>
                    </div>
                    {sheduleNotRegistered.map(({ start_hour, end_hour, professor, seccion, course, total }) => {
                        return (
                            <div className="grid grid-cols-5 px-4 py-5 text-sm text-gray-700 dark:text-gray-400 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                <div className="text-gray-500 dark:text-gray-400">
                                    {start_hour} a {end_hour}
                                </div>
                                <div>
                                    {course.semester}
                                </div>
                                <div>
                                    {professor.name}
                                </div>
                                <div>
                                    {course.name} - Seccion: {seccion.name}
                                </div>
                                <div>
                                    {total}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>

        {isLoading && <Spinner/>}
    </>
}
