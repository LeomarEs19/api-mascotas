import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import iconClose from '../assets/img/btn-close.jpg'
import iconoSave from '../assets/img/btn-save.jpg'

function EditPet() {
    const navigate = useNavigate();
    const [razas, setRazas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [generos, setGeneros] = useState([]);

    const nombre_mascota = useRef(null);
    const raza_id = useRef(null);
    const categoria_id = useRef(null);
    const imagen = useRef(null);
    const genero_id = useRef(null);

    const { id } = useParams();
    const [mascotas, setMascotas] = useState({});

    useEffect(() => {
        const getMascotas = async () => {
            const response = await axiosClient.get(`/mascota/${id}`);
            if (response.status === 200) {
                setMascotas(response.data);
            }
        };

        getMascotas();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            await axiosClient.get("/razas").then(response => {
                if (response.status === 200) {
                    setRazas(response.data);
                }
            });
            await axiosClient.get("/categoria").then(response => {
                if (response.status === 200) {
                    setCategorias(response.data);
                }
            });
            await axiosClient.get("/genero").then(response => {
                if (response.status === 200) {
                    setGeneros(response.data);
                }
            });
        };
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (confirm("¿Estás seguro que quieres modificar la mascota?")) {
                const formData = new FormData();
                formData.append('nombre_mascota', nombre_mascota.current.value);
                formData.append('raza_id', raza_id.current.value);
                formData.append('imagen', imagen.current.files[0] || null);
                formData.append('categoria_id', categoria_id.current.value);
                formData.append('genero_id', genero_id.current.value);

                const response = await axiosClient.put(`/mascota/${id}`, formData, {});
                if (response && response.status == 200) {
                    alert("Mascota actualizada correctamente");
                    navigate("/inicio");
                } else {
                    alert("Error al actualizar la mascota");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.jpg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Editar Mascota</h1>
                    <div className='w-[10%]'>
                        <Link to="/inicio"><img src={iconClose} alt="Cerrar" className='rounded-3xl'/></Link>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <img src={`http://localhost:3333/public/img/${mascotas.imagen}`} alt="" className='w-[150px] h-[150px] rounded-full border border-blue-500' />
                </div>
                <div>
                    <form className='w-full flex flex-col px-6 mt-14' onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' type="text" name='mascotas_name' placeholder='Nombre' ref={nombre_mascota} defaultValue={mascotas.nombre_mascota}/>
                        <select ref={raza_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4'>
                            <option value="" >Seleccione raza</option>
                            {razas.map(r => (
                                <option value={r.id} key={r.id} selected={r.nombre === mascotas.nombre_raza}>{r.nombre}</option>
                            ))}
                        </select>
                        <select ref={categoria_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4'>
                            <option value="0" >Seleccione categoría</option>
                            {categorias.map(c => (
                                <option value={c.id} key={c.id} selected={c.nombre === mascotas.nombre_categoria}>{c.nombre}</option>
                            ))}
                        </select>
                        <input className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' type="file" name='photo' placeholder='Foto' ref={imagen} />
                        <select ref={genero_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4'>
                            <option value="gender">Seleccione género</option>
                            {generos.map(g => (
                                <option value={g.id} key={g.id} selected={g.nombre === mascotas.nombre_genero}>{g.nombre}</option>
                            ))}
                        </select>
                        <button className='w-full flex justify-center' type='submit'>
                            <img src={iconoSave} alt="Guardar" className='rounded-3xl'/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPet;
