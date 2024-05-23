import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
        navigate("/")
    }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-3xl'>Cargando...</h1>
        </div>
    )
}

export default Logout