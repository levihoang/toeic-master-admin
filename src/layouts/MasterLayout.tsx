import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MasterLayout = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="flex" onClick={handleShowDropdown}>
      <section className="w-[16.5vw]">
        <SideBar />
      </section>
      <section className="flex-1">
        <header>
          <Header
            handleShowDropdown={handleShowDropdown}
            isShowDropdown={showDropDown}
          />
        </header>
        <main>
          <ToastContainer hideProgressBar={true} />
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </div>
  );
};

export default MasterLayout;
