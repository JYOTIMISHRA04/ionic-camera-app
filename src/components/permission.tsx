import React, { useEffect } from 'react';
import { IonButton } from '@ionic/react';
import { Plugins } from '@capacitor/core';

const { Filesystem, Permissions } = Plugins;

const RequestFileStorageAccess = () => {
    const checkPermission = async () => {
        try {
            const permissionStatus = await Permissions.requestPermission(
                'write_external_storage'
            );

            if (permissionStatus && permissionStatus.state === 'granted') {
                // Permission granted, proceed with file storage operations
                console.log('File storage access granted');
            } else {
                // Permission denied
                console.log('File storage access denied');
            }
        } catch (error) {
            console.error('Error requesting file storage access:', error);
        }
    };

    useEffect(() => {
        checkPermission();
    }, []);

    return (
        <IonButton expand="full" onClick={checkPermission}>
            Request File Storage Access
        </IonButton>
    );
};

export default RequestFileStorageAccess;