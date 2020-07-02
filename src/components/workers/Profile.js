import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Profile = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const [singleUser, updateSingleUser] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    password: "",
    profession: "",
    jobDescription: "",
    pricePerHour: "",
  });

  const getInfo = () => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then((response) => {
        updateSingleUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onSubmit = (data) => {
    axios
      .put("http://localhost:5000/api/profile/edit", data, {
        withCredentials: true,
      })
      .then(() => {
        getInfo();
      })
      .catch((err) => console.log(err));
  };
  console.log(typeof singleUser.birthday);

  if (!singleUser.profession) {
    return (
      <div className="container">
        <p className="title is-3">
          Bienvenido {singleUser.name} {singleUser.lastName}
        </p>
        <p className="subtitle is-4">Por favor completa tu perfil</p>

        <form onSubmit={handleSubmit(onSubmit)} className="box">
          <div className="field">
            <label className="label">Oficio</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="profession"
                placeholder="Carpintero"
                ref={register({
                  required: true,
                })}
              />
              {errors.profession && (
                <p className="error-form">Campo requerido</p>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="jobDescription"
                placeholder="Especialista en ébano"
                ref={register({ required: true })}
              />
              {errors.jobDescription && (
                <p className="error-form">Campo requerido</p>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label">Salario por hora</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="pricePerHour"
                placeholder="En MXN"
                ref={register({ required: true })}
              />
              {errors.pricePerHour && (
                <p className="error-form">Campo requerido</p>
              )}
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link is-light" type="submit">
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-96x96">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="avatar"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-3">Bienvenido de vuelta</p>
                <p className="title is-4">
                  {singleUser.name} {singleUser.lastName}
                </p>
                <p className="title is-5">Cumpleaños: {singleUser.birthday.substr(8,2)}/{singleUser.birthday.substr(5,2)}</p>
                <p className="subtitle is-5">{singleUser.profession}</p>
              </div>
            </div>

            <div className="content">
              <p>{singleUser.jobDescription}</p>
              <p className="title is-6">${singleUser.pricePerHour} por hora.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
