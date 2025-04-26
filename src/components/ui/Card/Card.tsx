import React from 'react';

import style from './Card.module.css';

interface CardTypes {
    title: string;
    desc: string;
    footer: string;
    onClick?: () => void;
    src?: string
}

const Card: React.FC<CardTypes> = ({title, desc, footer, onClick, src}) => {
    return (
        <div className={style.cardContainer} onClick={onClick}>
            <div className={style.cardHeader}>
                <h3>{title}</h3>
            </div>
            <div className={style.cardBody}>
                <p>{desc}</p>
                <img src={src} alt="banner" />
            </div>
            <div className={style.cardFooter}>
                <h3>{footer}</h3>
            </div>
        </div>
    );
};

export default Card;
