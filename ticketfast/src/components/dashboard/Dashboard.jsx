import React from 'react'
import Header from '../header/Header'
import DashboardCSS from './Dashboard.module.css'

export default function Dashboard() {
    return (
        <div className="main">
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>Listado de ANPs</p>
            </div>
            <div className={DashboardCSS.pagecontent}>

            </div>
        </div>

    )
}
