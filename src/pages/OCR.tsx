import React, { useState } from 'react';
import * as component from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Tesseract from 'tesseract.js';
import {} from 'react-image';
import cv from "@techstark/opencv-js"

const Home: React.FC = () => {  

  const [text, setText] = useState<string>();
  const [photo, setPhoto] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  let inverted;
  
  const handleClick = async () => {
    if (photo) {
      
      setLoading(true);
      // convert Base64 string to Image object
      const image = new Image();
      image.src = `data:image/jpeg;base64,${photo}`;
  
      // create a new canvas element and draw the image onto it
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
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
  
  
        // Display inverted image in a new canvas
        cv.imshow(canvas, inverted);
  
        // Convert canvas to base64 string
        const base64Image = canvas.toDataURL();
  
        const result = await Tesseract.recognize(
          base64Image,
          'eng',
          { logger: m => console.log(m) }
        );
        setText(result.data.text);
        setLoading(false);
  
        inverted.delete();
      }
    }
  };
  

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    setPhoto(image.base64String)
  };

  const clear = async () => {
    setText(undefined);
    setPhoto(undefined);
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
        <component.IonButton expand='block' onClick={() => takePhoto()}>
          Take Picture
        </component.IonButton>
        <component.IonButton expand="block" onClick={() => handleClick()}>
          Extract Text
        </component.IonButton>
        {photo &&
        <>
            <component.IonCard>
            <component.IonImg src={`data:image/jpeg;base64,${photo}`} />
            <component.IonCardContent>
                {isLoading ? (
                <component.IonProgressBar type="indeterminate"></component.IonProgressBar>
                ) : (
                <p>{text}</p>
                )}
            </component.IonCardContent>
            <component.IonButton expand='block' onClick={() => clear()}>
            Clear
            </component.IonButton>
            </component.IonCard>
        </>}
      </component.IonContent>
    </component.IonPage>
  );
};

export default Home;