import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState()
  const menu = [
    { id: 1, title: 'Dashboard', to: '/dashboard', permission: 0 },
    { id: 2, title: 'Students', to: '/students', permission: 0 },
    { id: 3, title: 'Teachers', to: '/teachers', permission: 0 },
    { id: 4, title: 'Groups', to: '/groups', permission: 0 },
    { id: 5, title: 'Courses', to: '/courses', permission: 0 },
    { id: 6, title: 'Accounting', to: '/accounting', permission: 0 },
    { id: 7, title: 'Settings', to: '/settings', permission: 0 }
  ]

  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 w-48 h-screen ">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul className="space-y-2 font-medium">
          {menu.map((m, i) => {
            return (
              <Link key={i} to={m.to}>
                <li
                  onClick={() => setActiveTab(m.id)}
                  className={`cursor-pointer mb-1 ${activeTab == m.id ? 'bg-sky-400 rounded-lg text-white' : 'bg-transparent'}`}
                >
                  <div className="flex items-center p-2  rounded-lg  hover:bg-sky-200 hover:text-white group">
                    <span className="ms-3 text-sm">{m.title}</span>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
