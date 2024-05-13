import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { createStudent, updateStudent } from "../../state/student/studentSlice";

const StudentAdd = () => {
  let { state } = useLocation()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.student)
  const [correctCreationToast, setCorrectCreationToast] = useState(false)
  const [errorCreationToast, setErrorCreationToast] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: new Date(),
    address: '',
    bloodType: '',
    email: '',
    phone: '',
    groups: []
  })

  useEffect(() => {
    if (state) {
      setFormData({ ...state, dateOfBirth: format(new Date(state.dateOfBirth), 'yyyy-MM-dd') })
    }
  }, [state])

  useEffect(() => {
    if (correctCreationToast) {
      const timer = setTimeout(() => {
        setCorrectCreationToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [correctCreationToast])
  useEffect(() => {
    if (errorCreationToast) {
      const timer = setTimeout(() => {
        setErrorCreationToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errorCreationToast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state) {
      dispatch(updateStudent(state.id, formData)).then((res) => {
        setCorrectCreationToast(true)
      }).catch((err) => {
        setErrorCreationToast(true)
      })

    } else {
      dispatch(createStudent(formData)).then((res) => {
        setCorrectCreationToast(true)
      }).catch((err) => {
        setErrorCreationToast(true)
      })
    }
  }
  return (
    <div className="p-2 w-full border h-[calc(100vh-3rem)] overflow-y-scroll">
      <div className="flex gap-4 items-center py-2">
        <Link to="/students" className="border p-3 rounded-full bg-slate-50">
          <FaArrowLeft />
        </Link>
        <h1>{state ? 'Update a student' : 'Create a student'}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>


          <div className="mb-4">
            <label htmlFor="address" className="block text-xs font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>


          <div className="flex gap-4 mb-4">
            <div className="w-1/3">
              <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="phone" className="block text-xs font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="bloodType" className="block text-xs font-medium text-gray-700">
                Blood type
              </label>
              <input
                type="text"
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      {
        correctCreationToast && (<div
          id="toast-success"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow absolute top-5 left-0 right-0 mx-auto"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-xs font-normal">{state ? 'Student updated successfully' : 'Student created successfully'}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => {
              setCorrectCreationToast(false)
            }}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>)
      }
      {errorCreationToast && (
        <div
          id="toast-danger"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow absolute top-5 left-0 right-0 mx-auto"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{state ? "Error updating student" : "Error creating student"}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
            data-dismiss-target="#toast-danger"
            aria-label="Close"
          // onClick={() => setErrorCreationToast(null)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>


  )
}

export default StudentAdd