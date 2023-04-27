import "./confirmtion.css";
import * as component from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Storage } from "@ionic/storage";
import React, { useState, useEffect } from "react";

const Conf: React.FC = () => {
  const store = new Storage();
  store.create();

  const history = useHistory();
  const [NIKhere, setNIKhere] = useState<any>("");
  const [nameHere, setNamehere] = useState<any>("");
  const [lahirHere, setLahirhere] = useState<any>("");
  const [pekerjaanHere, setPekerjaanhere] = useState<any>("");
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);


  

  useEffect(() => {
    // const intervalId = setInterval(() => {
      Promise.all([
        store.get("NIK"),
        store.get("NAME"),
        store.get("tempatLahir"),
        store.get("pekerjaan")
      ]).then(([NIK, NAME, lahir, job]) => {
        setNIKhere(NIK);
        setNamehere(NAME);
        setLahirhere(lahir);
        setPekerjaanhere(job);
        console.log(NIK, NAME, lahir, job);
      });
    // }, 2000);
  
    // return () => clearInterval(intervalId);
  }, [setNIKhere, setNamehere, setLahirhere, setPekerjaanhere]);
  

  function handleRefresh(event: CustomEvent<component.RefresherEventDetail>) {
    const timeOut = setTimeout(() => {
      Promise.all([
        store.get("NIK"),
        store.get("NAME"),
        store.get("tempatLahir"),
        store.get("pekerjaan")
      ]).then(([NIK, NAME, lahir, job]) => {
        setNIKhere(NIK);
        setNamehere(NAME);
        setLahirhere(lahir);
        setPekerjaanhere(job);
        console.log(NIK, NAME, lahir, job);
        event.detail.complete();
      });
    }, 2000);
  
    return () => clearTimeout(timeOut);
  }
  
  
  const back = async () => {
    history.push("/page/OCR/");
  };

  const ok = async () => {
    setIsAlertVisible(true);
    store.clear();
    history.push('/page/OCR/')
  };

  
  return (
    <component.IonPage>
      <component.IonHeader>
        <component.IonToolbar>
          <component.IonButtons slot="start">
            <component.IonMenuButton />
          </component.IonButtons>
          <component.IonTitle class="ion-text-center" id="title">
            Test App
          </component.IonTitle>
        </component.IonToolbar>
      </component.IonHeader>
      <component.IonContent className="ion-padding">
      <component.IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <component.IonRefresherContent></component.IonRefresherContent>
        </component.IonRefresher>
        <component.IonCard>
          <component.IonCardHeader>
            <component.IonCardTitle className="cardTitle">
              <p>Is Data Ok?</p>
            </component.IonCardTitle>
          </component.IonCardHeader>
          <component.IonCardContent>
            NIK: {NIKhere}
            <br />
            Nama : {nameHere}
            <br />
            Tempat Lahir : {lahirHere}
            <br />
            Pekerjaan : {pekerjaanHere}
          </component.IonCardContent>
          <component.IonButton expand="block" onClick={() => back()}>Back</component.IonButton>
          <component.IonButton expand="block" onClick={() => ok()}>Ok</component.IonButton>
          <component.IonAlert
              isOpen={isAlertVisible}
              onDidDismiss={() => setIsAlertVisible(false)}
              header="OK"
              message="Your data is ok, Thankyou"
              buttons={['OK']}
            ></component.IonAlert>
        </component.IonCard>
      </component.IonContent>
    </component.IonPage>
  );
};

export default Conf;
