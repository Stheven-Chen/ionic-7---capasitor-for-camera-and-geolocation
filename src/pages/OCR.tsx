import React, { useState, useEffect } from "react";
import "./OCR.css";
import * as component from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Tesseract from "tesseract.js";
import {} from "react-image";
import cv from "@techstark/opencv-js";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const store = new Storage();
  store.create();

  const [text, setText] = useState<string>();
  const [full, setFull] = useState<string>(); // For Test
  const [photo, setPhoto] = useState<any>();
  let [NIK, setNIK] = useState<any>();
  let [NAME, setNAME] = useState<any>();
  let [tempatLahir, setTempatLahir] = useState<any>();
  let [pekerjaan, setPekerjaan] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const history = useHistory();

  let inverted;
  let NIKREGEX = /NIK\s?:?.?(\d{16})/;
  let NAMAREGEX = /Nama\s?:?.?\s?([a-zA-Z\s]+)\n/i;
  let tempatLahirREGEX = /Tempat\/Tgl Lahir\s?:?.?\s?([a-zA-Z\s]+)\n/i;
  let pekerjaanREGEX = /Pekerjaan\s?:?.?\s?([a-zA-Z\s]+)\n/i;

  // storage.set('NIK', NIK);
  // storage.set('NAME', NAME);
  // storage.set('tempatLahir', tempatLahir);
  // storage.set('pekerjaan', pekerjaan);

  const handleClick = async () => {
    if (photo) {
      // convert Base64 string to Image object
      const image = new Image();
      image.src = `data:image/jpeg;base64,${photo}`;

      // create a new canvas element and draw the image onto it
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(image, 0, 0);

        // import img
        let src = cv.imread(canvas);

        // //gray
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        // //threshold
        let thresh = new cv.Mat();
        cv.threshold(gray, thresh, 165, 255, cv.THRESH_TRUNC + cv.THRESH_OTSU); // Trunc + OTSU

        // // Invert the colors
        inverted = new cv.Mat();
        cv.bitwise_not(thresh, inverted);

        src.delete();
        gray.delete();
        thresh.delete();

        setLoading(true);

        // Display inverted image in a new canvas
        cv.imshow(canvas, inverted);

        // Convert canvas to base64 string
        const base64Image = canvas.toDataURL();

        const result = await Tesseract.recognize(base64Image, "ind+eng", { logger: (m) => console.log(m) });
        let nikMatch = result.data.text.match(NIKREGEX);
        let namaMatch = result.data.text.match(NAMAREGEX);
        let lahirMatch = result.data.text.match(tempatLahirREGEX);
        let pekerjaanMatch = result.data.text.match(pekerjaanREGEX);
        const nik = nikMatch ? nikMatch[1].replace(/\s+/g, "") : null;
        const nama = namaMatch ? namaMatch[1].replace(/\n/g, "") : null;
        const lahir = lahirMatch ? lahirMatch[1].replace(/\n/g, "") : null;
        const job = pekerjaanMatch ? pekerjaanMatch[1].replace(/\n/g, "") : null;

        if (nik !== null || nama !== null || lahir !== null || job !== null) {
          console.log("NIK:", nik, "Nama:", nama);
          setText(`NIK: ${nik}\nNama: ${nama}\nTempat Lahir: ${lahir}\nPekerjaan: ${job}`);
          setNIK(nik);
          setNAME(nama);
          setTempatLahir(lahir);
          setPekerjaan(job);
        } else {
          console.log(`NIK: ${nik}\nNama: ${nama}\nTempat Lahir: ${lahir}\nPekerjaan: ${job}`);
          setText(`NIK: ${nik}\nNama: ${nama}\nTempat Lahir: ${lahir}\nPekerjaan: ${job}`);
        }

        console.log(result.data.text); // For Browser
        setFull(result.data.text); // For Test
        setLoading(false);

        inverted.delete();
      }
    }
  };

  const redirect = () => {
    console.log("sudah di klik");

    // Validasi input
    if (!NIK || !NAME || !tempatLahir || !pekerjaan) {
      setIsAlertVisible(true);
      return;
    }

    store
      .set("NIK", NIK)
      .then(() => console.log(NIK))
      .then(() => store.set("NAME", NAME))
      .then(() => console.log(NAME))
      .then(() => store.set("tempatLahir", tempatLahir))
      .then(() => console.log(tempatLahir))
      .then(() => store.set("pekerjaan", pekerjaan))
      .then(() => console.log(pekerjaan))
      .then(() => {
        console.log("Data saved");
        history.push(`/page/confirmation?NIK=${NIK}&NAME=${NAME}&tempatLahir=${tempatLahir}&pekerjaan=${pekerjaan}`);
      })
      .catch((error) => {
        console.error("Error saving data", error);
      });
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    setPhoto(image.base64String);
  };

  const clear = async () => {
    setText(undefined);
    setPhoto(undefined);
    setFull(undefined);
    setNIK(undefined);
    setNAME(undefined);
    setTempatLahir(undefined);
    setPekerjaan(undefined);
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
        <component.IonButton expand="block" onClick={() => takePhoto()}>
          Upload KTP
        </component.IonButton>
        <component.IonButton expand="block" onClick={() => handleClick()}>
          Extract Text
        </component.IonButton>
        {photo && (
          <>
            <component.IonCard>
              <component.IonImg src={`data:image/jpeg;base64,${photo}`} />
              <component.IonCardContent>
                {isLoading ? (
                  <component.IonProgressBar type="indeterminate"></component.IonProgressBar>
                ) : (
                  <div>
                    <h1>{text}</h1>
                    <p>{full}</p>
                  </div>
                )}
              </component.IonCardContent>
              <component.IonButton className="clearBtn" shape="round" expand="block" onClick={() => clear()}>
                Clear
              </component.IonButton>
            </component.IonCard>
          </>
        )}
        <component.IonCard className="inputCard">
          <component.IonCardTitle className="cardTitle">
            <h1>Input Field</h1>
          </component.IonCardTitle>
          <component.IonCardContent className="cardContent">
            <>
              <component.IonInput className="inputField" fill="solid" label="NIK" labelPlacement="floating" clearInput={true} value={NIK} onIonInput={(event) => setNIK(event.detail.value!)}></component.IonInput>
              <component.IonInput className="inputField" fill="solid" label="Nama" labelPlacement="floating" clearInput={true} value={NAME} onIonInput={(event) => setNAME(event.detail.value!)}></component.IonInput>
              <component.IonInput className="inputField" fill="solid" label="Tempat Lahir" labelPlacement="floating" clearInput={true} value={tempatLahir} onIonInput={(event) => setTempatLahir(event.detail.value!)}></component.IonInput>
              <component.IonInput className="inputField" fill="solid" label="Pekerjaan" labelPlacement="floating" clearInput={true} value={pekerjaan} onIonInput={(event) => setPekerjaan(event.detail.value!)}></component.IonInput>
              <component.IonButton className="submitBtn" shape="round" expand="block" onClick={() => redirect()}>
                Submit
              </component.IonButton>
              <component.IonAlert
                isOpen={isAlertVisible}
                onDidDismiss={() => setIsAlertVisible(false)}
                header="It's look like something missing here"
                message="Please fill in all fields."
                buttons={[
                  {
                    text: "OK",
                    cssClass: "alert-button-confirm",
                  },
                ]}
                cssClass="OCRalert"
              ></component.IonAlert>
            </>
          </component.IonCardContent>
        </component.IonCard>
      </component.IonContent>
    </component.IonPage>
  );
};

export default Home;
