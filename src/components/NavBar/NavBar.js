import React from 'react';
import {NavLink} from "react-router-dom";
import './NavBar.scss'

const NavBar = () => {
    return (
        <>
            <div className="navBlock">
                <div className="navLogo"></div>
                <nav className='nav'>
                    <div className='navLinkA'><NavLink to='/profile' activeClassName='activeLink'>Профиль</NavLink></div>
                    <div className='navLinkA'><NavLink to='/dialogs' activeClassName='activeLink'>Диалоги</NavLink></div>
                    <div className='navLinkA'><NavLink to='/news' 	 activeClassName='activeLink'>Новости</NavLink></div>
                    <div className='navLinkA'><NavLink to='/music'	 activeClassName='activeLink'>Музыка</NavLink></div>
                    <div className='navLinkA'><NavLink to='/settings'activeClassName='activeLink'>Настройки</NavLink></div>
                </nav>
            </div>
        </>
    )
}
export default NavBar;