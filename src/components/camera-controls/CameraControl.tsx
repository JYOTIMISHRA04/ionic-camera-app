import { IonGrid } from '@ionic/react';
import useCapacitorCameraHook from '../../hooks/useCapacitorCameraHook';
import ImageGrid from '../ImageGridView';

const CameraControl: React.FC<any> = () => {
    const { scanDocument, scannedDocs, removeItem } = useCapacitorCameraHook();

    return (
        <IonGrid>
            <ImageGrid images={scannedDocs} removeItem={removeItem} scanDocument={scanDocument} />
        </IonGrid>
    );
};

export default CameraControl;
