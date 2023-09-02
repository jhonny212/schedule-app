import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { createTemplateBar } from '../graphs/BarLine'
import { Spinner } from '../common/Spinner';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const Kpi = () => {
    const [metric, setMetric] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const [xAxisData, setXAxisData] = useState([])
    const [yAxisData, setYAxisData] = useState([])

    const chart = useRef(null)

    async function getData(type) {
        return await (await fetch(backendURL + `schedule/${type}`)).json()
    }



    function getNotRegistered(data, name) {
        let notRegistered = []
        let registered = []

        data.forEach(el => {
            const tmp = el.filter(el2 => el2.classroom == undefined)
            if (tmp.length > 0) {
                notRegistered = notRegistered.concat(tmp)
            } else {
                registered = registered.concat(el)
            }
        })
        const uniqueCourseIds = new Map();
        const uniqueData = [];
        notRegistered.forEach(item => {
            const courseId = item.course.id;

            if (!uniqueCourseIds.has(courseId)) {
                uniqueCourseIds.set(courseId, true);
                uniqueData.push(item);
            }
        });
        const notReg = uniqueData.length
        const reg = registered.length

        const yAxis = []
        const response = {
            type: "bar",
            smooth: true,
            data: yAxis,
            name
        }

        let emptyProffesor = 0
        let notEmptyProffesor = 0
        data.forEach(el => {
            let tmp = el.filter(el2 => el2.classroom != undefined)
            yAxis.push(tmp.length)

            emptyProffesor += el.filter(el2 => el2.professor == undefined).length
            notEmptyProffesor += el.filter(el2 => el2.professor != undefined).length

        })

        return {
            classrooms: {
                unoccupied: notReg, occupied: reg, name
            }, professors: {
                unoccupied: notEmptyProffesor, occupied: emptyProffesor, name
            }, yAxis: response
        }
    }


    function getMetric(models, description) {

        // Calculate the percentage of occupied spaces for each model
        const results = models.map(model => {
            const totalSpaces = model.occupied + model.unoccupied;
            const occupiedPercentage = (model.occupied / totalSpaces) * 100;
            return {
                name: model.name,
                occupiedPercentage,
            };
        });

        // Find the most efficient model (the one with the highest percentage)
        const mostEfficientModel = results.reduce((bestModel, currentModel) => {
            if (currentModel.occupiedPercentage > bestModel.occupiedPercentage) {
                return currentModel;
            } else {
                return bestModel;
            }
        });


        // Find the least efficient model (the one with the lowest percentage)
        const leastEfficientModel = results.reduce((worstModel, currentModel) => {
            if (currentModel.occupiedPercentage < worstModel.occupiedPercentage) {
                return currentModel;
            } else {
                return worstModel;
            }
        });

        return { mostEfficientModel, leastEfficientModel, results }
    }

    async function createChart() {
        const type1 = await getData("")
        const type2 = await getData("2")
        const type3 = await getData("3")
        const type4 = await getData("4")
        const type5 = await getData("5")
        const response1 = getNotRegistered(type1, "Por Asignación")
        const response2 = getNotRegistered(type2, "Horario Contratación")
        const response3 = getNotRegistered(type3, "Cursos")
        const response4 = getNotRegistered(type4, "Estudiantes")
        const response5 = getNotRegistered(type5, "Sin Prioridad")

        const xAxis = type1.map(item => item[0].start_hour)
        setXAxisData(xAxis)
        setYAxisData([
            response1.yAxis, response2.yAxis,
            response3.yAxis, response4.yAxis,
            response5.yAxis,
        ])

        const metric1 = getMetric([response1.professors, response2.professors, response3.professors, response4.professors,response5.professors])
        const metric2 = getMetric([response1.classrooms, response2.classrooms, response3.classrooms, response4.classrooms,response5.classrooms])
        metric1.description = "Eficiencia en base a la cantidad de maestros asignados"
        metric2.description = "Eficiencia en base a la cantidad de espacios ocupados"
        setMetric([metric1, metric2])
        
        setisLoading(false)
    }

    useEffect(() => {
        setisLoading(true)
        createChart()
    }, [])

    return <>
        <div className='flex items-center justify-center mt-10'>
            <ReactECharts
                ref={chart}
                option={createTemplateBar(false, 1, 'bar', xAxisData, yAxisData)}
                style={{ width: "100%", height: "500px" }}
                notMerge={true}
            ></ReactECharts>
        </div>
        <h1 className="mb-10 mt-10 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Mejores modelos
        </h1>

        <div className='grid w-full grid-flow-col gap-10 mt-10 justify-center'>

            {metric.map(el => {
                return (
                    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                            Eficiencia
                        </h5>
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {el.description}
                        </p>
                        <ul class="my-4 space-y-3">
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <span class="flex-1 ml-3 whitespace-nowrap">
                                        {el?.mostEfficientModel.name}
                                    </span>
                                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                        {Math.round(el?.mostEfficientModel.occupiedPercentage)}%
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <span class="flex-1 ml-3 whitespace-nowrap">
                                        {el?.leastEfficientModel.name}
                                    </span>
                                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                                        {Math.round(el?.leastEfficientModel.occupiedPercentage)}%
                                    </span>
                                </a>
                            </li>

                        </ul>
                        <div>
                            <a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg></a>
                        </div>
                    </div>
                )
            })}
        </div>


        {metric?.map(({ results, description }) => {
            return <>
                <h1 className="mb-10 mt-10 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                    {description}
                </h1>
                <div className='grid w-full grid-flow-col gap-10 mt-10 justify-center'>
                    {
                        results.map(el => {
                            return (
                                <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                    <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                        Porcentaje de eficiencia
                                    </h5>
                                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Metrica general
                                    </p>
                                    <ul class="my-4 space-y-3">
                                        <li>
                                            <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <span class="flex-1 ml-3 whitespace-nowrap">
                                                    {el?.name}
                                                </span>
                                                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                                                    {Math.round(el?.occupiedPercentage)}%
                                                </span>
                                            </a>
                                        </li>


                                    </ul>
                                    <div>
                                        <a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                            <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg></a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        })}

        {isLoading && <Spinner/>}
    </>
}
