import './Footer.module.css';

import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return <div className={style.footerWrapper}>
                <div className={style.footerContent}>
                    <p>© AppX 2025</p>
                    <p>Todo app created with react tools</p>
                    <p>MIT Liscence</p>
                    <p>Main site: <Link to="/">www.appx.com</Link></p>
                </div>
            </div>
}

export default Footer;