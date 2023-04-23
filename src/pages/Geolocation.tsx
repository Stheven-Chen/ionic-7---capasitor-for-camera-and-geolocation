import React, { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import "./Geolocation.css";
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

const Geolokasi: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openMap = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
  };

  const getGeo = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } catch (error) {
      console.log(error);
    }
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
            <IonCol size="12" className="GeoCard">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="CardTitle">
                    <h1>This Is Geolocation</h1>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="CardContent">
                  <h2>Latitude: {latitude}</h2>
                  <h2>Longitude: {longitude}</h2>
                </IonCardContent>
                <div className="geoBtn">
                <IonButton shape="round" color="secondary" onClick={getGeo}>
                  Get Geolocation 
                </IonButton>
                <IonButton shape="round" color="secondary" onClick={openMap}>
                  Open Map
                </IonButton>
                </div>

              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Geolokasi;

