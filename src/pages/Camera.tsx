import React, { useState } from "react";
import "./Camera.css";
import { Camera, CameraResultType } from '@capacitor/camera';
import { 
  IonPage, 
  IonHeader, 
  IonContent, 
  IonGrid, 
  IonToolbar,
  IonButtons,
  IonButton, 
  IonTitle,
  IonMenuButton,
  IonRow,
  IonCol
} from "@ionic/react";

const Kamera: React.FC = () => {
  const [photo, setPhoto] = useState<string>();

  const handleCameraClick = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    setPhoto(image.dataUrl);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle class="ion-text-center" id="title">
            Test App
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h1 className="h1test">This Is Camera</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" class="ion-text-center">
              {photo ? (
                <img src={photo} />
              ) : (
                <IonButton onClick={handleCameraClick}>Take a photo</IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Kamera;
