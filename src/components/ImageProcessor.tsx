import { useState } from 'react';
import ImageContainer from './ImageContainer';
import ImageFilterToolbar from './ImageFilterToolbar';

const ImageProcessor = ({ selectedImage }: any) => {

    const initialFilterSettings = {
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        enhance: 0,
        sepia: 0,

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


