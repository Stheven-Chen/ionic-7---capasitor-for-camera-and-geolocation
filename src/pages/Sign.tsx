import SignaturePad from "signature_pad";
import { useRef, useEffect, useState } from "react";
import "./Sign.css";
import { 
    IonPage, 
    IonHeader, 
    IonContent, 
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

const Sign: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const signaturePad = useRef<SignaturePad | null>(null);
    const [sign, setSign] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const signaturePadOptions = {
                backgroundColor: 'rgb(255, 255, 255)',
                penColor: 'rgb(0, 0, 0)',
            };
            signaturePad.current = new SignaturePad(canvas, signaturePadOptions);
            signaturePad.current.clear(); // clear signature
        }
    }, []);
      
    const handleClear = () => {
        signaturePad.current?.clear();
        setSign(null); // reset sign state
    };

    const handleSave = () => {
        const dataURL = signaturePad.current?.toDataURL();
        if (dataURL) {
            setSign(dataURL); // save signature to state
        }
    };

    return (
        <>
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
                        <IonCol size='12'>
                            <IonCard>
                                <IonHeader>
                                    <IonCardTitle className="signTitle">
                                        <h1>This Is Signature</h1>
                                    </IonCardTitle>
                                </IonHeader>
                                <IonCardContent>
                                    <canvas id="signature-pad" ref={canvasRef}></canvas>
                                </IonCardContent>
                                <div className="signBtn">
                                    <IonButton color="secondary" onClick={handleClear}>Clear</IonButton>
                                    <IonButton color="secondary" onClick={handleSave}>Save</IonButton>
                                </div>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    {sign && (
                        <IonRow>
                            <IonCol size='12'>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            <h1 className='signedTitle'>Signed</h1>
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <img src={sign} alt="Sign" />
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    )}
                </IonContent>
            </IonPage>
        </>
    );
};

export default Sign;
