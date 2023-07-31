import React, { useState } from 'react'
import ImageFilterToolbar from './ImageFilterToolbar'
import ImageContainer from './ImageContainer'
import Konva from 'konva';
import { image } from 'ionicons/icons';
import { IonCol, IonFooter, IonGrid, IonTitle, IonToolbar } from '@ionic/react';





const ImageProcessor = ({ selectedImage }: any) => {

    const initialFilterSettings = {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        exposure: 0,
        hue: 0,
        grayscale: 0,
        threshold: 0,
        emboss: 0,
        enhance: 0,
        sepia: 0,
        opacity: 0
    };
    const [filterArray, setFilterArray] = useState()
    const [filterSettings, setFilterSettings] = useState(initialFilterSettings);
    const [selectedFilter, setSelectedFilter] = useState("")

    const setFilters = (newFilters: any) => {
        setFilterArray(newFilters)
    }

    return (<>
        {selectedImage &&
            <ImageContainer
                filterSettings={filterSettings}
                selectedImage={selectedImage}
                filterArray={filterArray}
                selectedFilter={selectedFilter}
            />}
        <ImageFilterToolbar
            filterSettings={filterSettings}
            setFilterSettings={setFilterSettings}
            setFilters={setFilters}
            setSelectedFilter={setSelectedFilter}
            // filterArray={filterArray}
            selectedFilter={selectedFilter}
            setFilterArray={setFilterArray}
        />

    </>
    )
}

export default ImageProcessor


