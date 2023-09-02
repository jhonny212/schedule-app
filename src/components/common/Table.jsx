import React, { useEffect, useState } from 'react'

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const Table = ({headers, edit, remove, keys,  onDelete, onEdit, key_ref = "id", detail, dataFetch }) => {

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-4 mr-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map(el => {
                            return (
                                <th scope="col" className="px-6 py-3">
                                    {el}
                                </th>
                            )
                        })}

                        {edit &&
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        }

                        {remove &&
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Remove</span>
                            </th>
                        }

                        {detail &&
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Detalle</span>
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>

                    {dataFetch.map((el) => {
                        return (
                            <tr>
                                {keys.map((key) => {
                                    return <td className="px-6 py-4">
                                        {el[key]}
                                    </td>
                                })}

                                {
                                    edit &&
                                    <td className="px-6 py-4 text-right" onClick={() => {
                                        onEdit(dataFetch.filter((items) => items[key_ref] == el[key_ref]))
                                    }} >
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Editar
                                        </a>
                                    </td>
                                }

                                {
                                    remove &&
                                    <td className="px-6 py-4 text-right" onClick={() => {
                                        onDelete(el[key_ref])
                                    }}>
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Eliminar
                                        </a>
                                    </td>
                                }

                                {
                                    detail &&
                                    <td className="px-6 py-4 text-right">
                                        <a href={`${detail}/${el[key_ref]}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Detalle
                                        </a>
                                    </td>
                                }
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
