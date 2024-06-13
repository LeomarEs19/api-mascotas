import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../utils/axiosClient';
import boton from '../assets/img/btn.jpg'
import iconClose from '../assets/img/btn-close.jpg'
import iconolupa from '../assets/img/btn-show.jpg'
import iconoEditar from '../assets/img/btn-edit.jpg'
import iconoDelete from '../assets/img/btn-delete.jpg'


const ListarMascotas = () => {

    const [mascotas, setMascotas] = useState([]);
    const [conteoRazas, setConteoRazas] = useState({});
    const navigate = useNavigate()

    const getMascotas = async () => {
        try {
            const response = await axiosClient.get("/mascota");
            if (response.status === 200) {
                console.log(response.data);
                setMascotas(response.data);
                contarRazas(response.data); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const contarRazas = (mascotas) => {
        const conteo = {};
        mascotas.forEach(mascota => {
            const raza = mascota.nombre_raza;
            conteo[raza] = (conteo[raza] || 0) + 1;
        });
        setConteoRazas(conteo);
    };
    

    useEffect(() => {
        getMascotas();
    }, []);


    const handleDeletePet = async (id) => {
        try {
            if (confirm('¿Estás seguro de eliminar esta mascota?')) {
                await axiosClient.delete(`/mascota/${id}`);
                alert('Mascota eliminada correctamente');
                getMascotas();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.jpg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Administrar Mascotas</h1>
                    <div className='w-[10%]'>
                        <Link to="/logout"><img src={iconClose} alt="" className='rounded-3xl'/></Link>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Link to="/crear"><img src={boton} alt="" className='rounded-3xl'/></Link>
                </div>
                <div className='px-4 py-4 h-[75%] overflow-auto'>
                    {Object.keys(conteoRazas).length > 0 ? (
                        <div className='bg-white bg-opacity-60 p-4 rounded-xl mb-4'>
                            <h2 className='text-blue-900 mb-2'>Conteo de Razas:</h2>
                            <ul>
                                {Object.entries(conteoRazas).map(([raza, cantidad]) => (
                                    <li key={raza}>{raza}: {cantidad}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className='text-white'>No hay conteo de razas disponible.</p>
                    )}
                    {mascotas.length > 0 ? (
                        <ul className='space-y-4'>
                            {mascotas.map((m, index) => (
                                <li key={index} className='text-blue-900'>

                                    <div className='flex justify-between items-center py-4 px-3 bg-white bg-opacity-60 rounded-xl'>
                                        <div className='flex flex-row items-center gap-3'>
                                            <img className='w-12 h-12 rounded-full border border-blue-700' src={`http://localhost:3333/public/img/${m.imagen}`} alt="" />
                                            <div className='flex flex-col'>
                                                <span>{m.nombre_mascota}</span>
                                                <span className='text-sm text-blue-900'>{m.nombre_raza}</span>
                                            </div>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <button onClick={() => { navigate(`/consultar/${m.id}`) }}>
                                                <img src={iconolupa} alt="Show" className='rounded-3xl'/>
                                            </button>
                                            <button onClick={() => { navigate(`/editar/${m.id}`)  }}>
                                                <img src={iconoEditar} alt="Edit" className='rounded-3xl'/>
                                            </button>
                                            <button onClick={() => { handleDeletePet(m.id) }}>
                                                <img src={iconoDelete} alt="Delete" className='rounded-3xl'/>
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-white'>No hay mascotas registradas.</p>
                    )}
                </div>
            </div>
        </div>
    );

};

export default ListarMascotas;
