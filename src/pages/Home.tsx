import React, { useState, useEffect } from "react";
import "./Home.css";
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

const Home: React.FC = () => {
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
              <h1 className="h1test">Test The Feature</h1>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
