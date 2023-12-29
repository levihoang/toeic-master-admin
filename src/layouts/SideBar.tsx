import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/Learning-cuate-2.png';
import { Link, useParams } from 'react-router-dom';

const SideBar = () => {
  const pathName = window.location.pathname;
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">ADMIN</h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src={avatar}
              alt=""
              style={{ width: '40px', height: '40px' }}
            />
            <div className="bg-success rounded-circle border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Hoang Trung Nhat</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className={`navbar-nav w-100`}>
            <Link
              to={'/'}
              className={`nav-item nav-link ${
                pathName.startsWith('/category-edit') ||
                pathName.startsWith('/group-question') ||
                pathName === '/category-add' ||
                pathName === '/'
                  ? 'active'
                  : ''
              }`}
            >
              Category Management
            </Link>
          </div>
          <div className="navbar-nav w-100">
            <Link
              to={'/blog'}
              className={`nav-item nav-link ${
                pathName.startsWith('/blog') ? 'active' : ''
              }`}
            >
              Blog Management
            </Link>
          </div>
          <div className="navbar-nav w-100">
            <Link
              to={'/account'}
              className={`nav-item nav-link ${
                pathName.startsWith('/account') ? 'active' : ''
              }`}
            >
              Account Management
            </Link>
          </div>
          <div className="navbar-nav w-100">
            <Link
              to={'/course'}
              className={`nav-item nav-link ${
                pathName.startsWith('/course') ? 'active' : ''
              }`}
            >
              Course Management
            </Link>
          </div>
          <div className="navbar-nav w-100">
            <Link
              to={'/exam'}
              className={`nav-item nav-link ${
                pathName.startsWith('/exam') ? 'active' : ''
              }`}
            >
              Exam Management
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
