import React, { useState } from 'react';
import * as component from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Tesseract from 'tesseract.js';

const Home: React.FC = () => {
  const [text, setText] = useState<string>();
  const [photo, setPhoto] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (photo) {
      setLoading(true);
      const result = await Tesseract.recognize(
        `data:image/jpeg;base64,${photo}`,
        'eng',
        { logger: m => console.log(m) }
      );
      setText(result.data.text);
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
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
                <component.IonLoading message="Extracting text..." />
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