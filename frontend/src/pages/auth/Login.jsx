import React, { useRef } from 'react';
import img from '../../assets/img/login.jpg';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';

const Login = () => {

  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email: email.current.value,
        password: password.current.value
      }

      const response = await axiosClient.post("/login", data)
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/inicio')
      } else if (response.status == 404 || response.status == 500) {
        alert('Credenciales erroneas')
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md">
        <img
          src={img}
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-8 rounded-lg">
          <form className="space-y-4 mt-150" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Correo Electrónico"
                className="w-full px-3 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-60"
                required
                ref={email}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="w-full px-3 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-60"
                required
                ref={password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600 transition duration-200"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
