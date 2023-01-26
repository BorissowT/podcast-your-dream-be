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
              <Link
                to="/login"
                className="ml1 no-underline black"
              >
                <li class="nav-item">
                      <a class="nav-link" href="login">Login</a>
                  </li>
              </Link>
              <Link
                to="/login"
                className="ml1 no-underline black"
              >
                <li class="nav-item">
                    <a class="nav-link"href="new_user">Signup</a>
                </li>
              </Link>  
            </ul>
        </div>
    </nav>
  

  );
};

export default Header;