import React from 'react';
import { Button } from '../../ui';
import { Link } from 'react-router-dom';
import errorImg from '../../../images/error-page.jpg'

import style from './Error.module.css';

const Error: React.FC = () => {
    return (
        <div className={style.errorPage}>
            <div className={style.errorImage}>
                <img src={errorImg} alt="404" />
            </div>
            <br />
            <h1>Page not found!</h1>
            <div>
                <Link to="/dashboard"><Button>Dashboard</Button></Link>
                <Link to="/"><Button background='green'>Home</Button></Link>
            </div>
        </div>
    );
}

export default Error;