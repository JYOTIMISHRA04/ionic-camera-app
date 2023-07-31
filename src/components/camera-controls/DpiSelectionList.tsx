import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';

const DpiSelectionList = () => {
    const [selectedDpi, setSelectedDpi] = useState('');

    const dpiOptions = [
        { id: 'dpi-1', label: 'DPI Option 1', value: 'Option 1' },
        { id: 'dpi-2', label: 'DPI Option 2', value: 'Option 2' },
        { id: 'dpi-3', label: 'DPI Option 3', value: 'Option 3' },
    ];

    const handleDpiSelection = (event: any) => {
        setSelectedDpi(event.detail.value);
    };

    return (
        <IonList>
            <IonRadioGroup value={selectedDpi} onIonChange={handleDpiSelection}>
                {dpiOptions.map((option) => (
                    <IonItem key={option.id}>
                        <IonLabel>Select DPI{option.label}</IonLabel>
                        <IonRadio slot="start" value={option.value} />
                    </IonItem>
                ))}
            </IonRadioGroup>
        </IonList>
    );
};

export default DpiSelectionList;