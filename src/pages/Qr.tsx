import './Qr.css';
import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/react';
import QRCode from 'qrcode-generator';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Plugins, Capacitor } from '@capacitor/core';

const Qr: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [link, setLink] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const generateQRCode = () => {
    if (qrRef.current) {
      const qr = QRCode(0, 'L');
      qr.addData(link);
      qr.make();
      qr.createImgTag(90, 1);
      qrRef.current.innerHTML = qr.createImgTag();
    }
  };

  const startScan = async () => {
    try {
      setIsScanning(true);
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        setLink(result.content);
      } else {
        console.error('Scan cancelled or failed');
      } 
    } catch (e) {
      console.error('Error while scanning QR code', e);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (Capacitor.isNative) {
      const { Permissions } = Plugins;
      const checkPermission = async () => {
        const result = await Permissions.query({ name: 'camera' });
        if (result.state === 'denied') {
          const status = await Permissions.requestPermission({ name: 'camera' });
          if (status.state !== 'granted') {
            console.error('Camera permission not granted.');
          }
        }
      };
      checkPermission();
    }
    return () => {
      BarcodeScanner.stopScan();
    };
  }, []);

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
        <IonRow>
          <IonCol>
            <IonInput className='input'
              value={link}
              placeholder="Input link here"
              onIonChange={(e) => setLink((e.detail.value) ? e.detail.value.toString():"Input Link Here" )}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='6'>
            <IonButton shape='round' expand='block' onClick={generateQRCode}>
              Generate QR Code
            </IonButton>
          </IonCol>
          <IonCol size='6'>
            <IonButton
              expand='block'
              onClick={startScan}
              disabled={isScanning}
              shape='round'
            >
              {isScanning ? 'Scanning...' : 'Scan QR Code'}
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
            <div ref={qrRef}></div>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Qr;
