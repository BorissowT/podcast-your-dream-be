import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

import "bootstrap/dist/css/bootstrap.min.css"


const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    
      <nav class="p-2 navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="no-underline black">
          <a class="navbar-brand " href="#">Podcast Your dream</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
          </button>
        </Link>   
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home </a>
                </li>
            </ul>
            <ul class="navbar-nav">
            {authToken && (
              <div className="flex">
                <Link
                  to="/user"
                  className="ml1 no-underline black"
                >
                <li class="nav-item">
                    <a class="nav-link" href="/user">My Profile</a>
                </li>
                </Link>
                

              </div>
            )}
            {authToken ? (
              <div
                className=" flex ml1 pointer black"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  navigate(`/`);
                }}
              >
              <li class="nav-item">
                    <a class="nav-link" href="login">Logout</a>
                </li>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml1 no-underline black"
              >
                <li class="nav-item">
                      <a class="nav-link" href="login">Login</a>
                  </li>
              </Link>  
            )}
             
            </ul>
        </div>
    </nav>
  

  );
};

export default Header;