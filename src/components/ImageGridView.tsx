import { IonAvatar, IonBadge, IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonThumbnail } from '@ionic/react';
import { arrowForward, cameraOutline, chevronBack, closeCircle, shareSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ImageProcessor from './ImageProcessor';

// import jsPDF from 'jspdf';

const ImageGrid = ({ images, removeItem, scanDocument }: any) => {
    const [selectedImage, setSelectedImage]: any = useState(null);
    const [openModal, setOpenModal]: any = useState(false);

    console.log(selectedImage)

    const openFullScreen = (image: any) => {
        setSelectedImage(image);
        setOpenModal(!openModal)
    };

    const closeFullScreen = () => {
        setSelectedImage(null);
        setOpenModal(false)
    };

    const history = useHistory()
    return (
        <IonGrid>
            <IonItem lines="none" >
                <IonBadge slot="end" color={"dark"}>{images.length}</IonBadge>
                <IonLabel>
                    <h1><b>Documents</b></h1>
                </IonLabel>
            </IonItem>
            <IonFab horizontal="end" vertical="bottom" onClick={scanDocument}>
                <IonFabButton color={"#ededed"}>
                    <IonIcon icon={cameraOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonList>
                {images.map((image: any, index: React.Key) => (
                    // <IonCol key={index} size="6" style={{ cursor: 'pointer' }}>
                    <IonItem onClick={() => openFullScreen(image)} >
                        <IonThumbnail slot="start">
                            <img
                                src={image.src}
                                alt={`Image ${index}`}
                                style={{ height: "auto", maxHeight: '200px', width: '100%', }}
                            />
                        </IonThumbnail>
                        <IonLabel>
                            {image.name}
                        </IonLabel>
                        <IonIcon icon={arrowForward} color='dark' slot='end'></IonIcon>
                        <IonIcon onClick={(e: any) => { e.stopPropagation(); removeItem(index) }} icon={closeCircle} color='danger' slot='end'></IonIcon>
                    </IonItem>
                ))}
            </IonList>


            <IonModal isOpen={openModal} onDidDismiss={closeFullScreen}>

                <IonItem >
                    <IonAvatar>
                        <IonIcon size='large' icon={chevronBack} onClick={() => setOpenModal(!openModal)}>
                        </IonIcon>
                    </IonAvatar>

                    <IonLabel>
                        <h1 style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <b>Image enhancer</b></h1>
                        <p>{selectedImage?.name}</p>
                    </IonLabel>            <IonButton id="open-action-sheet" color={'dark'}><IonIcon icon={shareSharp}></IonIcon></IonButton>


                </IonItem>
                <IonContent>
                    <ImageProcessor selectedImage={selectedImage} />
                </IonContent>
            </IonModal>
        </IonGrid >
    );
};

export default ImageGrid;