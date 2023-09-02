import React from 'react'

function getContentCell(data,item) {
    const course = data.find(el=> (el.classroom?.id ) == item.id);
    if (course) {
        return <div className='p-1 bg-slate-400 rounded-lg text-black'>
            <p>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {course.course.name}
                </span>
                <br />
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                    Sección {course.seccion.name}
                </span>
            </p>
            <p className='py-1'>
                <span className={`bg-green-100 ${course.professor == null ?'text-red-800 dark:bg-red-900 dark:text-red-300': 'text-green-800 dark:bg-green-900 dark:text-green-300' } font-medium mr-2 px-2.5 py-0.5 rounded-full  `}>
                    Catedratico: {course.professor?.name || "Not Found"}
                </span>
            </p>
            <p className='py-1'>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                    Asignados: {course.total}
                </span>
            </p>

            <p className='py-1'>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                    Semestre: {course.course.semester}
                </span>
            </p>
        </div>
    }
}

export const RowSchedule = ({ data, classrooms }) => {
    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {data[0]?.start_hour} - {data[0]?.end_hour}
        </th>

        {classrooms.map(el => {
            return <td key={el.id} className="px-6 py-4">
                {getContentCell(data,el)}
            </td>
        })}

    </tr>
}
