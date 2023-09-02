import React from 'react'

export const ClassroomHeader = ({classroom}) => {
  return <th scope="col" className="px-6 py-3">
    {classroom.name}
    <br />
    <small>Capacidad: {classroom.capacity}</small>
  </th>
}
