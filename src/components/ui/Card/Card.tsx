import React from 'react';

import style from './Card.module.css';

interface CardTypes {
    title: string;
    desc: string;
    footer: string;
    onClick?: () => void;
}

const Card: React.FC<CardTypes> = ({title, desc, footer, onClick}) => {
    return (
        <div className={style.cardContainer} onClick={onClick}>
            <div className={style.cardHeader}>
                <h3>{title}</h3>
            </div>
            <div className={style.cardBody}>
                <p>{desc}</p>
            </div>
            <div className={style.cardFooter}>
                <h3>{footer}</h3>
            </div>
        </div>
    );
};

export default Card;
