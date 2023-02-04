import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import "../styles/Login.css";

import "bootstrap/dist/css/bootstrap.min.css"

const Login = () => {
  
  const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
    ) user{
      id
      username
      email
      isStaff
  	}
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
    email: ''
  });
  

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ tokenAuth }) => {
      localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
      navigate('/');
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      navigate('/');
    }
  });

  

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      {!formState.login && (
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email"  onChange={(e) =>
          setFormState({
            ...formState,
            email: e.target.value
          })
        } class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      )}
      <div class="form-group">
        <label for="usernameInput">Username</label>
        <input type="username" 
        onChange={(e) =>
          setFormState({
            ...formState,
            username: e.target.value
          })
        } class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username"></input>
        
      </div>    

      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input value={formState.password} onChange={(e) =>
          setFormState({
            ...formState,
            password: e.target.value
          })
        } type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
      </div>
      <div class="mt-1">
        <button onClick={formState.login ? login : signup} class="btn btn-primary">Login</button>
        <button onClick={(e) =>
          setFormState({
            ...formState,
            login: !formState.login
          })
        } class="mx-1 btn btn-dark">{formState.login
          ? 'Need to create an account?'
          : 'Already have an account?'}</button>
      </div>      
    </div>
  )
};

export default Login;