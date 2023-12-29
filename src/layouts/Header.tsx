import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/Learning-cuate-2.png';
import { LogoutIcon } from '../assets/icons/Index';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  handleShowDropdown: () => void;
  isShowDropdown: boolean;
};

const Header = ({ handleShowDropdown, isShowDropdown }: HeaderProps) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  useEffect(() => {
    if (isShowDropdown) {
      setIsShow(false);
    }
  }, [isShowDropdown]);

  return (
    <>
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 pb-3 mb-3 border-b border-solid border-[#e6ebeb]">
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0">
            <i className="fa fa-hashtag"></i>
          </h2>
        </a>
        <div className="navbar-nav align-items-center ms-auto">
          <div className="relative">
            <div
              className="flex justify-center items-center"
              data-bs-toggle="dropdown"
            >
              <img
                className="rounded-circle me-lg-2"
                src={avatar}
                alt=""
                style={{ width: '40px', height: '40px' }}
                onClick={() => {
                  handleShowDropdown();
                  setIsShow(!isShow);
                }}
              />
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </div>
            {isShow && (
              <div className="bg-white border border-solid border-[#e6ebeb] rounded-bottom m-0 absolute top-[46px] rounded">
                <div
                  className="dropdown-item cursor-pointer px-3 py-2 transition-all hover:!bg-[#A7CFEC] rounded !text-[#00A8FF] !flex gap-2 items-center justify-center"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  <p className="mb-0">Log Out</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
