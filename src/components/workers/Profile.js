import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Profile = props => {

    const { register,errors, handleSubmit } = useForm()

    const [singleUser, updateSingleUser] = useState({
        name:'',
        lastName:'',
        birthday:'',
        phoneNumber:'',
        password:'',
        profession:'',
        jobDescription:'',
        pricePerHour:''
    })

    const getInfo = () => {
        axios.get('http://localhost:5000/api/profile', {withCredentials:true})
        .then(response => {
            updateSingleUser(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=> {
        getInfo()
    }, [])

    const onSubmit = data => {
        axios.put('http://localhost:5000/api/profile/edit', data, {withCredentials:true})
        .then(() =>{
            getInfo()
        })
        .catch(err => console.log(err))
    }
    if(!singleUser.profession){
        return(
            <div className='container'>
                <p>Bienvenido {singleUser.name} {singleUser.lastName}</p>
                <p>Completa tu perfil</p>

                <form onSubmit={handleSubmit(onSubmit)} className='box'>

                    <div className="field">
                        <label className="label">Oficio</label>
                        <div className="control">
                            <input 
                            className="input" 
                            type="text" 
                            name="profession" 
                            placeholder='Carpintero'
                            ref={register({
                                required:true,
                            })}
                            />
                            {errors.profession && <p className='error-form'>Campo requerido</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Descripción</label>
                        <div className="control">
                            <input 
                            className="input" 
                            type="text" 
                            name="jobDescription" 
                            placeholder='Especialista en ébano'
                            ref={register({required:true})}
                            />
                            {errors.jobDescription && <p className='error-form'>Campo requerido</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Salario por hora</label>
                        <div className="control">
                            <input 
                            className="input" 
                            type="text" 
                            name="pricePerHour" 
                            placeholder='En MXN'
                            ref={register({required:true})}
                            />
                            {errors.pricePerHour && <p className='error-form'>Campo requerido</p>}
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className='button is-link is-light' type="submit">Actualizar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    else {
        return(
            <div>
                <p>Bienvenido de vuelta {singleUser.name} {singleUser.lastName}</p>
                <p>Oficio: {singleUser.profession}</p>
                <p>Descripción: {singleUser.jobDescription}</p>
                <p>Cobro por hora: {singleUser.pricePerHour}</p>
            </div>
        )
    }
    
}

export default Profile;