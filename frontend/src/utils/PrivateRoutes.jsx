import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

function PrivateRoutes() {
    const auth = window.localStorage.getItem('token')

    return (
        auth ? <Outlet/> : <Navigate to="/logout" />
    )
}

export default PrivateRoutes