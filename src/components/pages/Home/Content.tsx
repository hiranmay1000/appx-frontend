
import React from "react";
import style from './Home.module.css';
import { Outlet, useLocation } from "react-router-dom";
import Welcome from "../Welcome/Welcome";


const HomeContent: React.FC = () => {
    const location = useLocation();
    
    return (<></>
    )
}

export default HomeContent;