import logo from './logo.svg';
import './App.css';
import { Schedule } from './components/schedule/Schedule';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { NavBarItem } from './components/navbar/NavBarItem';
import { ClassroomList } from './components/classroom/ClassroomList';
import { CourseList } from './components/course/CourseList';
import { ProfessorList } from './components/professor/ProfessorList';
import { ProfessorAssigments } from './components/professor/ProfessorAssigments';
import { Card } from './components/common/Card';
import { Kpi } from './components/kpi/Kpi';
import { Spinner } from './components/common/Spinner';


function Home() {
  return <>
    <div className='grid grid-cols-3 grid-flow-row m-10 gap-4'>
      <div>
        <Card link={"/schedule/1"} title={"Horario Por Asignaciones"} description={"Horario generado en base a la prioridad de asignaciones"} />
      </div>

      <div>
        <Card link={"/schedule/2"} title={"Horario Por horario de contratación"} description={"Horario generado en base a la prioridad de horario de contratación"} />
      </div>

      <div>
        <Card link={"/schedule/3"} title={"Horario Por cursos"} description={"Horario generado en base a la prioridad de cursos"} />
      </div>

      <div>
        <Card link={"/schedule/4"} title={"Horario Por cantidad de alumnos"} description={"Horario generado en base a la prioridad de la cantidad de alumnos"} />
      </div>

    </div>
  </>
}
function App() {
  return <>
    <NavBar>
      <NavBarItem title={'Inicio'} href={'/'} />
      <NavBarItem title={'Salones'} href={'classrooms'} />
      <NavBarItem title={'Cursos'} href={"courses"} />
      <NavBarItem title={'Maestros'} href={"professor"} />
      <NavBarItem title={'Metricas'} href={"kpi"} />
      
    </NavBar>
    

    <Router>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/classrooms" element={<ClassroomList />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/professor" element={<ProfessorList />} />
        <Route path="/professor/:cui" element={<ProfessorAssigments />} />
        <Route path="/kpi" element={<Kpi />} />


      </Routes>
    </Router>

  </>
}

export default App;
