import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import iconoSave from '../assets/img/btn-save.jpg'
import iconoClose from '../assets/img/btn-close.jpg'

function CreatePets() {
    const navigate = useNavigate();
    const [razas, setRazas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [generos, setGeneros] = useState([]);

    const nombre_mascota = useRef(null);
    const raza_id = useRef(null);
    const categoria_id = useRef(null);
    const imagen = useRef(null);
    const genero_id = useRef(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const razasResponse = await axiosClient.get("/razas");
                if (razasResponse.status === 200) {
                    setRazas(razasResponse.data);
                }
                const categoriasResponse = await axiosClient.get("/categoria");
                if (categoriasResponse.status === 200) {
                    setCategorias(categoriasResponse.data);
                }
                const generosResponse = await axiosClient.get("/genero");
                if (generosResponse.status === 200) {
                    setGeneros(generosResponse.data);
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm("¿Estás seguro que quieres crear la mascota?")) {
                const formData = new FormData();
                formData.append('nombre_mascota', nombre_mascota.current.value);
                formData.append('raza_id', raza_id.current.value);
                formData.append('imagen', imagen.current.files[0]);
                formData.append('categoria_id', categoria_id.current.value);
                formData.append('genero_id', genero_id.current.value);

                const response = await axiosClient.post("/mascota", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response && response.status === 201) {
                    alert("Mascota creada correctamente");
                    navigate("/inicio");
                } else {
                    alert("Error al crear la mascota");
                }
            }
        } catch (error) {
            console.error("Error al crear mascota:", error);
            alert("Error al crear la mascota. Verifica los datos e intenta nuevamente.");
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div style={{ backgroundImage: "url('/bg.jpg')", width: '400px', height: '100vh', backgroundRepeat: 'no-repeat' }}>
                <div className='w-full flex justify-between px-10 py-6 items-center'>
                    <h1 className='text-white w-full text-center'>Adicionar Mascotas</h1>
                    <div className='w-[10%]'>
                        <Link to="/inicio"><img src={iconoClose} alt="Cerrar" className='rounded-3xl'/></Link>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <img src="/photo-lg-0.svg" alt="Foto" />
                </div>
                <div>
                    <form className='w-full flex flex-col px-6 mt-14' onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>
                        <input className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' type="text" name='nombre' placeholder='Nombre' ref={nombre_mascota} required />
                        <select ref={raza_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' required>
                            <option value="">Seleccione raza</option>
                            {razas.map(r => (
                                <option value={r.id} key={r.id}>{r.nombre}</option>
                            ))}
                        </select>
                        <select ref={categoria_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' required>
                            <option value="0">Seleccione categoría</option>
                            {categorias.map(c => (
                                <option value={c.id} key={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                        <input className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' type="file" name='imagen' placeholder='Foto' ref={imagen} required />
                        <select ref={genero_id} className='bg-white bg-opacity-60 rounded-full mb-6 px-4 py-4' required>
                            <option value="gender">Seleccione género</option>
                            {generos.map(g => (
                                <option value={g.id} key={g.id}>{g.nombre}</option>
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

export default CreatePets;
