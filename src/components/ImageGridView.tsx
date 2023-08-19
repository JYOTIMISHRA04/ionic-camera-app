import { IonAvatar, IonBadge, IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonThumbnail } from '@ionic/react';
import { arrowForward, cameraOutline, chevronBack, closeCircle, document, shareSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ImageProcessor from './ImageProcessor';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { Directory, Filesystem } from '@capacitor/filesystem';

// import jsPDF from 'jspdf';

const ImageGrid = ({ images, removeItem, scanDocument }: any) => {
    const [selectedImage, setSelectedImage]: any = useState(null);
    const [openModal, setOpenModal]: any = useState(false);
    const [localDocs, setLocalDocs]: any = useState({})
    async function readFilesAndGroupByType() {
        try {
            const directory = '';

            // Read the files from the directory
            const result = await Filesystem.readdir({ path: directory, directory: Directory.Data });

            // Group the files by file type
            const filesByType: any = {};

            result.files.forEach(({ name, uri }: any) => {
                const fileType = name.split(".")[1]
                if (!filesByType[fileType]) {
                    filesByType[fileType] = [];
                }
                filesByType[fileType].push({ name, uri });
            });
            console.log(filesByType)


            // Return the grouped object
            return filesByType;
        } catch (error) {
            console.error('Error reading files:', error);
            return null;
        }
    }

    // Example usage:
    useEffect(() => {
        (async () => {
            if (!openModal) {
                const result = await readFilesAndGroupByType()
                setLocalDocs(result)
            }
        })()

    }, [openModal])


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
            {
                Object.keys(localDocs).map((item: any) => {
                    return <><IonItem>
                        <IonLabel>{item}</IonLabel>
                    </IonItem>
                        {
                            localDocs[item].map(({ name, uri }: any) => {
                                return <IonItem
                                    onClick={(e: any) => {
                                        FileOpener.open(uri, name.includes("pdf") ? "application/pdf " : 'image/jpeg')
                                            .then(() => console.log('File is opened'))
                                            .catch((error: any) => console.log('Error openening file', error));

                                    }} >
                                    <IonThumbnail slot="start">
                                        <IonIcon src={document}></IonIcon>
                                    </IonThumbnail>
                                    <IonLabel>
                                        {name}
                                    </IonLabel>

                                </IonItem>
                            })
                        }</>
                })
            }

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