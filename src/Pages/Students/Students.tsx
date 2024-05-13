import React, { useEffect } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { FaArrowTrendUp, FaCircleInfo } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { deleteStudent, fetchStudents } from '../../state/student/studentSlice'
import { useDispatch, useSelector } from 'react-redux'

const Students = () => {
  const dispatch = useDispatch()
  const { studentsList } = useSelector(state => state.student)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
    <div className="w-full">
      <div className="p-2 flex justify-between w-full">
        <h1 className="font-bold">Students</h1>
        <Link to="/students/add">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">
            Add student
          </button>
        </Link>
      </div>
      <div className="px-2">
        <div className="flex flex-wrap mb-2">
          <div className="p-3 bg-white rounded-lg w-56 shadow-md border">
            <FaArrowTrendUp className="text-slate-500 text-3xl" />
            <h1 className="font-bold text-2xl text-slate-500"> {studentsList.length}</h1>
            <h2 className="text-xs font-thin text-slate-500">Total registered students</h2>
          </div>
        </div>
        <div className="relative overflow-x-auto  text-xs table-wrp h-[calc(100vh-13.5rem)]">
          <table className="w-full text-left rtl:text-right text-gray-500 border ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="h-[calc(100vh-13.5rem)] overflow-y-auto">
              {studentsList?.map((student) => {
                return (
                  <tr
                    key={student.id}
                    className="bg-white border-b cursor-pointer hover:bg-slate-100"
                  >
                    <th
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {student.id}
                    </th>

                    <td className="px-6 py-1">
                      {student.name}
                    </td>
                    <td className="px-6 py-1">{student.phone}</td>
                    <td className="px-6 py-1">{student.email}</td>
                    <td className="px-6 py-1  ">
                      <Link to="/students/add" state={student}>
                        <FaPen className="inline mr-2 hover:text-yellow-600" />
                      </Link>

                      <FaTrash
                        onClick={() => {
                          dispatch(deleteStudent(student.id))
                        }}
                        className="inline mr-2 hover:text-red-600"
                      />
                      <Link to="/students/details" state={student}>
                        <FaCircleInfo className="inline hover:text-blue-600" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Students