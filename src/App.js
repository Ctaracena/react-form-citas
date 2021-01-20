import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types'

function App() {

  //citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')) //debemos parsear pues localStorage solo recine strings
  if (citasIniciales === null){
    citasIniciales = []
  }
  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales)

  //useEffect para realizar ciertas operaciones cuando el State cambia
  //useEffect siempre recibe una arrow function
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas)) //usamos stringify para pasar la info en string a localStorage
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]) //este se conoce como array de dependecias, cuando este array cambie se ejecutará el useEffect)

  //Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas(
      [
        ...citas, 
        cita
      ]
    )
  }

  //Función para eliminar cita por su id
  const eliminarCita = (id => {
    //filter crea un nuevo arreglo con todas las citas que tengan un id diferente del que queremos eliminar
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    //usamos la funcion guardarCitas del hook (no es necesario usar corchetes pues filter crea un nuevo array) para pasar el nuevo arreglo con las citas que no se eliminaron
    guardarCitas(nuevasCitas) 
  })

  //Mensaje condicional 
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
          <h2> {titulo} </h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//Se crea un objeto con el nombre del componente.propTypes
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
