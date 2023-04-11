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
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
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

  const resetPhoto = async () =>{
    setPhoto(undefined);
  }

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
              <IonCard className="imgCard">
                <IonHeader>
                  <IonCardTitle>

                    <h1 className="cameraTitle">This Is Camera</h1>
                  </IonCardTitle>
                </IonHeader>
                <IonCardContent>
                {photo ? (
                <>
                  <img src={photo} />
                  <IonButton onClick={resetPhoto}>Take Again</IonButton>
                </>
              ) : (
                <IonButton expand="block" onClick={handleCameraClick}>Take a photo</IonButton>
              )}

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Kamera;
