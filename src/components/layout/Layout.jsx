import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function Layout({ children }) {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {children}
            </div>
        </div>
    )
}
