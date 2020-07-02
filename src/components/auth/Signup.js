import React from 'react';
import AuthService from '../../services/auth-services';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const Signup = props => {


  const service = new AuthService();
  const history = useHistory()
  const { register,errors, handleSubmit } = useForm()

  const onSubmit = (data) => {
      const {name, lastName, phoneNumber, birthday, password} = data
    service.signup(name, lastName, phoneNumber, birthday, password)
    .then(() => {
        Swal.fire({
            title: "Bien!",
            text: 'Tu usuario fue creado, ya puedes iniciar sesión',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    })
    .then(() => history.push('/workers/login'))
    .catch( () => {
        Swal.fire({
        title: "Error!",
        text: 'Algo salió mal',
        icon: 'error',
        confirmButtonText: 'Intenta de nuevo'
        })
    } )
  }
  
      
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className='box'>
        <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
                <input className="input" 
                    type="text" 
                    name="name" 
                    placeholder='Miguel' 
                    ref={register({required:true})}
                />
                {errors.name && <p className='error-form'>Campo requerido</p>}
            </div>
        </div>

        <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
                <input className="input" 
                    type="text" 
                    name="lastName" 
                    placeholder='López' 
                    ref={register({required:true})}
                />
                {errors.lastname && <p className='error-form'>Campo requerido</p>}
            </div>
        </div>

        <div className="field">
            <label className="label">Fecha de nacimiento</label>
            <div className="control">
                <input className="input" 
                    type="text" 
                    name="birthday" 
                    placeholder='tu fecha' 
                    ref={register({required:true})}
                />
                {errors.store && <p className='error-form'>Campo requerido</p>}
            </div>
        </div>

        <div className="field">
            <label className="label">Numero telefónico</label>
            <div className="control">
                <input className="input" 
                    type="text" 
                    name="phoneNumber" 
                    placeholder='example@mail.com' 
                    ref={register({
                        required:true
                    })}
                />
                {errors.username && <p className='error-form'>Campo requerido</p>}
            </div>
        </div>

        <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
                <input className="input" 
                    type="password" 
                    name="password" 
                    placeholder='Must be 8 or more characters' 
                    ref={register({required:true})}
                />
                {errors.password && <p className='error-form'>Campo requerido</p>}
            </div>
        </div>

        <div className="field">
            <div className="control">
            <button className='button is-link' type="submit">Registrar</button>
            </div>
        </div>

        <div className='field'>
            <div className='control'>
            <p>¿Ya tienes cuenta? 
                <Link to={"/login"}> Iniciar sesión</Link>
            </p>
            </div>
        </div>

        </form>
  )
  
}

export default Signup;