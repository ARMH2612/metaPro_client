import { FaArrowLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudentGroup, fetchStudents } from '../../state/student/studentSlice';

const StudentDetails = () => {
  const { studentsList } = useSelector(st => st.student)

  let { state } = useLocation()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    status: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addStudentGroup(state.id, formData)).then(() => {
      console.log(studentsList.find(s => s.id === state.id));

      state = studentsList.find(s => s.id === state.id)
    }).catch(err => {
      console.log(err);

    })
  }


  return (
    <div className="w-full p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center py-2">
          <Link to="/students" className="border p-3 rounded-full bg-slate-50">
            <FaArrowLeft />
          </Link>
          <h1>Student Details</h1>
        </div>
      </div>
      <div className="p-2">
        <div className="flex border mb-2">
          <div className="p-5 flex flex-col items-center border-r gap-3">
            <div className="rounded-full overflow-hidden h-28 w-28 border flex items-center justify-center">
            </div>
            <h1 className="text-xl font-semibold">
              {state.name}
            </h1>
            <h4 className="text-sm">{state.email}</h4>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="px-6 py-0 text-xs">Date de naissance:</td>
                <td className="px-6 py-0 text-xs">Tel:</td>
                <td className="px-6 py-0 text-xs">Blood type:</td>
              </tr>
              <tr>
                <td className="px-6 py-0 text-xs font-semibold">{format(new Date(state.dateOfBirth), 'yyyy-MM-dd')}</td>
                <td className="px-6 py-0 text-xs font-semibold">{state.phone}</td>
                <td className="px-6 py-0 text-xs font-semibold">{state.bloodType}</td>
              </tr>
              <tr>
                <td className="px-6 py-0 text-xs">Adresse:</td>
              </tr>
              <tr>
                <td className="px-6 py-0 text-xs font-semibold">{state.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div className="flex flex-col border p-3 gap-3">
        <div >
          <form onSubmit={handleSubmit} className='flex items-center gap-3'>
            <div>
              <select
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option>Choose un Groupe</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Biology">Biology</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
              </select>
            </div>
            <div>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option>Choose Status</option>
                <option value="Paid">Paid</option>
                <option value="Waiting">Waiting</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div >
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>



        <table className="w-full text-left rtl:text-right text-gray-500 border ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Group
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="h-[calc(100vh-13.5rem)] overflow-y-auto">
            {state.groups.map((grp, i) => {
              return (
                <tr key={i} className="bg-white border-b cursor-pointer hover:bg-slate-100">
                  <th
                    scope="row"
                    className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {grp.name}
                  </th>
                  <td className="px-6 py-1">{grp.status}</td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default StudentDetails