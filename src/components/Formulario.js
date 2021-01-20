import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
    
    //Crear State de Validación
    const [error, setError] = useState(false)

    //Desestructuración de los datos del State
    const {mascota, propietario, fecha, hora, sintomas} = cita

    //Función que se ejecuta cada que el usuario escribe en un input
    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Función que se ejecuta al enviar el formulario (crear cita)
    const handleSubmit = e => {
        e.preventDefault();

        //Validación
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true)
            return;
        }
        setError(false)

        //Asignar un ID
        cita.id = uuidv4()

        //Crear la cita
        crearCita(cita)

        //Reiniciar el Formulario para una nueva cita usando la funcion del hook actualizar cita y poniendo los valores como al inicio
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
        
    }

    return (  
        <Fragment>
            <h2>Crear Cita</h2>

            <form 
                onSubmit={handleSubmit}
            >

                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    placeholder="Nombre Mascota"
                    className="u-full-width"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre del Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    placeholder="Nombre Dueño de la mascota"
                    className="u-full-width"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label>Síntomas del Paciente</label>
                <textarea rows="12"
                    name="sintomas"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                >
                </textarea>

                <button
                    className="button-primary u-full-width"
                >
                    Agregar Cita
                </button>

                {error ? <p className="alerta-error">Todos los Campos son obligatorios</p> : null }

            </form>
        </Fragment>
    );
}
 
export default Formulario;