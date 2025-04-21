import React from 'react';
import { Button } from '../../ui';
import { Link } from 'react-router-dom';

import style from './Error.module.css';

const Error: React.FC = () => {
    return (
        <div className={style.errorPage}>
            <h1>Page not found!</h1>
            <Link to="/">
                <Button background='green'>Home</Button>
            </Link>
        </div>
    );
}

export default Error;