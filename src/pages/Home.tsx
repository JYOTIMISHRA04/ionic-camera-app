import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import CameraControl from '../components/camera-controls/CameraControl';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonItem >
        <IonLabel>
          <h5><b>mQuotient</b> |<span style={{
            "background": "chartreuse",
            "borderRadius": "3px",
            "border": "1px solid #ededed",
            "padding": "4px",
            "fontSize": "13px",
            "marginLeft": "5px",
            color: "#006d22"
          }}>Document Scanner</span></h5>
        </IonLabel>
      </IonItem>
      <IonContent fullscreen>
        <CameraControl />
      </IonContent>
    </IonPage>
  );
};

export default Home;
