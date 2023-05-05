import React from 'react'
import HeaderCSS from './Header.module.css'

export default function Header() {
    return (
        <div className={HeaderCSS.main}>
            <h1 className={HeaderCSS.h1}>
                TICKET-FAST <i class="fa-solid fa-ticket" color='white'></i>
            </h1>
        </div>
    )
}
