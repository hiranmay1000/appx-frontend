import { useNavigate } from 'react-router-dom';
import style from './Dashboard.module.css';
import React from 'react';
import { Card } from '../../ui';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={style.dashboardContainer}>
      <h2 className={style.title}>Welcome to AppX, powered by React</h2>
      <br />
      <div className={style.cardsWrapper}>
        <Card
          title="Vault"
          desc="File management system"
          footer="/vault"
          onClick={() => navigate('/vault')}
        />
        <Card
          title="COCO Model"
          desc="COCO Model helps identifying objects in images, This is an image recogniation application"
          footer="/coco"
          onClick={() => navigate('/coco')}
        />
        <Card
          title="Profile"
          desc="Profile section, helps user to maintain their profile"
          footer="/profile"
          onClick={() => navigate('/profile')}
        />
        <Card
          title="Chatbot"
          desc="Chatting application for global users"
          footer="/chatbot"
          onClick={() => navigate('/chatbot')}
        />
        <Card
          title="QR Generator"
          desc="This application generates QR code based on user input"
          footer="/gen-qrcode"
          onClick={() => navigate('/gen-qrcode')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
