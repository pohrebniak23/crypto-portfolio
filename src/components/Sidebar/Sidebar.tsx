import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './sidebar.sass';

export const Sidebar: React.FC = () => (
  <div className="sidebar">
    <div className="sidebar__logo">
      <img src={logo} alt="" />
    </div>
    <div className="sidebar__top">
      <ul className="sidebarMenu">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? 'sidebar__active' : '')}
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/portfolio"
            className={({ isActive }) => (isActive ? 'sidebar__active' : '')}
          >
            Портфолио
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);
