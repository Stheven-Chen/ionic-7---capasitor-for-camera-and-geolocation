import "./confirmtion.css";
import * as component from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
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

  // passing value using get method  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const NIK = params.get("NIK");
  const NAME = params.get("NAME");
  const tempatLahir = params.get("tempatLahir");
  const pekerjaan = params.get("pekerjaan");


  

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
    //   Promise.all([
    //     store.get("NIK"),
    //     store.get("NAME"),
    //     store.get("tempatLahir"),
    //     store.get("pekerjaan")
    //   ]).then(([NIK, NAME, lahir, job]) => {
    //     setNIKhere(NIK);
    //     setNamehere(NAME);
    //     setLahirhere(lahir);
    //     setPekerjaanhere(job);
    //     console.log(NIK, NAME, lahir, job);
    //     event.detail.complete();
    //   });

    // GET
    const NIK = params.get("NIK");
    const NAME = params.get("NAME");
    const tempatLahir = params.get("tempatLahir");
    const pekerjaan = params.get("pekerjaan");
    event.detail.complete();
    }, 2000);
  
    return () => clearTimeout(timeOut);

  }
  
  
  const back = async () => {
    history.push("/page/OCR/");
  };

  const ok = async () => {
    setIsAlertVisible(true);
  };

  const alertOK = async ()=>{
    store.clear();
    history.push('/page/OCR/');
    
  }

  
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
          {/* use useState hook of "here" to use storage method, now is using get to pass value  */}
          <component.IonCardContent>
            NIK: {NIK}
            <br />
            Nama : {NAME}
            <br />
            Tempat Lahir : {tempatLahir}
            <br />
            Pekerjaan : {pekerjaan}
          </component.IonCardContent>
          <div className="ionBtn">
          <component.IonButton className="backBtn" color="warning" shape="round" expand="block" onClick={() => back()}>Back</component.IonButton>
          <component.IonButton className="okBtn" shape="round" expand="block" onClick={() => ok()}>Ok</component.IonButton>
          </div>
          <component.IonAlert
              isOpen={isAlertVisible}
              onDidDismiss={() => setIsAlertVisible(false)}
              header="OK"
              message="Your data is ok, Thankyou"
              buttons={[{
                text: 'OK',
                cssClass: 'alert-button-confirm',
                handler: () => alertOK(),
              }]}              
              cssClass='okAlert'
            ></component.IonAlert>
        </component.IonCard>
      </component.IonContent>
    </component.IonPage>
  );
};

export default Conf;


