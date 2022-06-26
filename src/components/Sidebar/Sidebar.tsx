import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './sidebar.sass';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar__top">
                <ul className="sidebarMenu">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? 'sidebar__active' : ''
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/portfolio"
                      className={({ isActive }) =>
                        isActive ? 'sidebar__active' : ''
                      }
                    >
                      Portfolio
                    </NavLink>
                  </li>
                </ul>
                
            </div>
        </div>
  )
}
