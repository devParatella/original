import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserInfo, logout } from '../User/auth';
import ModalHelp from '../Modal/ModalHelp';
import LogoPMS from '../../assets/img/LogoPMS.png'
import NavBar from "./NavBar";
const Header = ({ onToggleSidebar }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const user = getUserInfo();
  if (!user) {
    return <p>User not logged in</p>;
  }


  return (
    <>
             
      <header id="header" className="header fixed-top d-flex align-items-center">
      
        <div className="d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src={LogoPMS} alt="Logo-PMS-Hoteleiro" />
            <span className="d-none d-lg-flex"> Hoteleiro</span>
          </a>
          <NavBar/>
        </div>
        {/* <!-- End Logo --> */}

        <nav className="header-nav ms-auto user-info ">
          <ul className="d-flex align-items-center">

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                <img
                  //assets/img/profile-img.jpg" passar a foto por referencia da imagem  
                  src="../../assets/img/User.jpg"
                  alt="Foto do Usuario"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6 className="">{user.master ? 'Administrador' : 'Usuário'}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/usuario"
                  >
                    <i className="bi bi-person"></i>
                    <span>Usuários</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Button variant="primary" onClick={handleShow}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Ajuda?</span>
                  </Button>
                  <ModalHelp show={showModal} handleClose={handleClose}>
                    <p>Help</p>
                  </ModalHelp>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={logout} >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  );
};

export default Header;
