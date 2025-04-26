import React from 'react';
import style from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Card } from '../../ui';
import { API_URL } from '../../../config';
import filesFolderBanner from '../../../images/file-folder-banner.jpg';
import cocoImgBanner from '../../../images/vr-banner.svg';
import chatbotBanner from '../../../images/chatbot-banner.jpg';
import newsBanner from '../../../images/news-banner.jpg';
import qrBanner from '../../../images/qr-banner.jpg';


const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  return (
    <div className={style.dashboardContainer}>
      <h2 className={style.title}>Welcome to AppX, powered by React</h2>
      <br />
      <div className={style.cardsWrapper}>
        <Card
          title="Vault"
          desc="Securely manage and access your files anytime, anywhere."
          footer="/vault"
          onClick={() => navigate('/vault')}
          src={filesFolderBanner}
        />
        <Card
          title="COCO Model"
          desc="Advanced image recognition using the COCO dataset to detect objects with precision."
          footer="/coco"
          onClick={() => navigate('/coco')}
          src={cocoImgBanner}
        />
        <Card
          title="Chatbot"
          desc="Engage in real-time conversations with our intelligent chatbot."
          footer="/chatbot"
          onClick={() => navigate('/chatbot')}
          src={chatbotBanner}
        />
        <Card
          title="QR Generator"
          desc="Easily generate custom QR codes from your text or links."
          footer="/gen-qrcode"
          onClick={() => navigate('/gen-qrcode')}
          src={qrBanner}
        />
        <Card
          title="News"
          desc="Stay informed with the latest news and real-time global updates."
          footer="/news"
          onClick={() => navigate('/news')}
          src={newsBanner}
        />
      </div>
      <p className={style.warning}>
        <strong>Note:</strong> Some applications are still in <strong>development!</strong> Unexpected <span className={style.errorFlikker}>errors</span> may occur!
      </p>
    </div>
  );
};

export default Dashboard;
