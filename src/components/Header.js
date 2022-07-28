import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
          <div className="container px-4 px-lg-5">React Blog
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu<i className="fas fa-bars"></i></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto py-4 py-lg-0">
                <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="" onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                navigate(`/login`);
              }}>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  };
  
  export default Header;