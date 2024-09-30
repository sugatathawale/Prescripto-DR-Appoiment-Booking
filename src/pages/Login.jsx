import React, { useState } from 'react';
import { initializeApp } from 'firebase/app'; // Correct import from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth functions from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin }) => {
  const [state, setState] = useState('Sign Up');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Firebase configuration object
  const firebaseConfig = {
    apiKey: 'AIzaSyAGuFj3Moe_o9BvGHw_5yQ0xFOOA4mq6MY',
    authDomain: 'prescripto-4f445.firebaseapp.com',
    projectId: 'prescripto-4f445',
    storageBucket: 'prescripto-4f445.appspot.com',
    messagingSenderId: '12557222594',
    appId: '1:12557222594:web:56a7da046324ee22d0315b',
  };

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); // Initialize Firebase Authentication

  // Submit handler for creating a new account
  const onSubmitHandler = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLogin(true);
        navigate('/'); // Navigate to home after successful signup
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage); // Log any errors
      });
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
