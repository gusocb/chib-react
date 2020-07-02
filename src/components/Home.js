import React from 'react';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css';

const Home = props => {
    return(
        <div className='container'>
            <p>Inicio</p>
            <Link to='/workers/signup'>Prestadores de servicios</Link><br />
            <Link to='/jobs'>Consulta los trabajos disponibles</Link>
        </div>
    )
};

export default Home;