import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

const Home = (props) => {
  return (
    <div className="container">
      <p className="title is-3">Inicio/Home</p>
      <button class="button is-large is-fullwidth is-info is-light">
        <Link to="/jobs">See available jobs</Link>
      </button>
    </div>
  );
};

export default Home;
