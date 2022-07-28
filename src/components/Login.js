import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AUTH_TOKEN } from '../constants';

const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        user_fullname: '',
        user_email: '',
        user_mobile: '',
        password: ''
    });

    const loginInput = {
        user_mobile: formState.user_mobile,
        password: formState.password
    }

    const registerInput = {
        user_fullname: formState.user_fullname,
        user_email: formState.user_email,
        user_mobile: formState.user_mobile,
        password: formState.password
    }

    const LOGIN_MUTATION = gql`
    mutation login_mutation(
        $input: loginInput
    ) {
        login( 
            input: $input
        ){
            token
            user {
                user_id
            }
        }
    }
    `;

    const REGISTER_MUTATION = gql`
    mutation register_mutation(
        $input: registerInput!
        ) {
        register(
            input: $input
        )
    }
    `;

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
          input: loginInput
        },
        onCompleted: ({ login }) => {
          localStorage.setItem(AUTH_TOKEN, login.token);
          console.log("Login completed.");
          navigate('/');
        }
      });
      
      const [signup] = useMutation(REGISTER_MUTATION, {
        variables: {
          input: registerInput
        },
        onCompleted: ({ signup }) => {
        //   localStorage.setItem(AUTH_TOKEN, signup.token);
            console.log("Register completed");
            navigate('/login');
        }
      });

  return (
    <div className="auth-inner">
      <form>
        <h3>
          {formState.login ? 'Login' : 'Sign Up'}
        </h3>
          <div className='mb-3'>
            {!formState.login && (
              <input
                value={formState.user_fullname}
                className='form-control'
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    user_fullname: e.target.value
                  })
                }
                type="text"
                placeholder="Your full name"
              />
            )}
          </div>
          <div className='mb-3'>
            {!formState.login && (
              <input
                value={formState.user_email}
                className='form-control'
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    user_email: e.target.value
                  })
                }
                type="text"
                placeholder="Your email"
              />
            )}
          </div>
          <div className='mb-3'>
            <input
              value={formState.user_mobile}
              className='form-control'
              onChange={(e) =>
                setFormState({
                  ...formState,
                  user_mobile: e.target.value
                })
              }
              type="text"
              placeholder="Your mobile number"
            />
          </div>
          <div className='mb-3'>
            <input
              value={formState.password}
              className='form-control'
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value
                })
              }
              type="password"
              placeholder="Choose a safe password (>8 characters)"
            />
          </div>
          <div className='d-grid'>
            <button
              type='button'
              className="btn btn-primary"
              onClick={formState.login ? login : signup}
            >
                {formState.login ? 'login' : 'create account'}
            </button>
          </div>
          <div className='buttons'>
            <button type='button'
              className='change-page-button'
              onClick={(e) =>
                setFormState({
                    ...formState,
                    login: !formState.login
                })
              }>
              {formState.login
              ? 'Create an account?'
              : 'Already have an account?'}
            </button>
          </div>
          
      </form>
    </div>
  );
};

export default Login;