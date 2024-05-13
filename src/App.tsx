import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Students from './Pages/Students/Students'
import Teachers from './Pages/Teachers'
import Groups from './Pages/Groups'
import Accounting from './Pages/Accounting'
import Settings from './Pages/Settings'
import Courses from './Pages/Courses'
import StudentAdd from './Pages/Students/StudentAdd'
import StudentDetails from './Pages/Students/StudentDetails'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/courses/details" element={<CourseDetails />} />*/}
        <Route path="/students/add" element={<StudentAdd />} />
        <Route path="/students/details" element={<StudentDetails />} />
        {/* <Route path="/teachers/details" element={<TeachersDetails />} />
        <Route path="/teachers/add" element={<TeacherAddForm />} />
        <Route path="/groups/details" element={<GroupsDetails />} />
        <Route path="/groups/add" element={<GroupAddForm />} />
        <Route path="/attendance/add" element={<AddAttendanceForm />} />  */}
      </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
