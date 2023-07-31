import { useEffect, useState } from 'react'
import ImageFilterRangeSlider from './ImageFilterRangeSlider'
import { IonicCarouselControl } from './IonicCarouselControl'
import { IonItem, IonLabel, IonRow } from '@ionic/react';

const ImageFilterToolbar = ({ selectedFilter, setSelectedFilter, filterSettings, setFilterSettings, setFilters, filterArray }: any) => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (event: CustomEvent) => {
        const value = event.detail.value as number;
        setSliderValue(value / 100);

    };

    useEffect(() => {
        setFilterSettings({ ...filterSettings, [selectedFilter]: sliderValue })
    }, [sliderValue])

    useEffect(() => {
        setSliderValue(filterSettings[selectedFilter])
    }, [])

    const minMax: any = {
        "brightness": {
            "property": "brightness",
            "min": -1,
            "max": 1,
            "defaultValue": 0
        },
        "contrast": {
            "property": "contrast",
            "min": -1,
            "max": 1,
            "defaultValue": 0
        },
        "saturation": {
            "property": "saturation",
            "min": -1,
            "max": 1,
            "defaultValue": 0
        },
        "exposure": {
            "property": "exposure",
            "min": -1,
            "max": 1,
            "defaultValue": 0
        },
        "hue": {
            "property": "hue",
            "min": 0,
            "max": 360,
            "defaultValue": 0
        },
        "grayscale": {
            "property": "grayscale",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        },
        "threshold": {
            "property": "threshold",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        },
        "emboss": {
            "property": "emboss",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        },
        "enhance": {
            "property": "enhance",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        },
        "sepia": {
            "property": "sepia",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        },
        "opacity": {
            "property": "opacity",
            "min": 0,
            "max": 1,
            "defaultValue": 0
        }
    }

    const { min, max } = minMax[selectedFilter] || { min: 0, max: 100 }
    return (
        <div style={{ height: "100px", padding: "15px" }}>

            {selectedFilter && <ImageFilterRangeSlider
                currentValue={filterSettings[selectedFilter]}
                handleSliderChange={handleSliderChange}
                min={min}
                max={max}
            />}
            <IonicCarouselControl
                items={Object.keys(filterSettings)}
                setSelectedFilter={setSelectedFilter}
                setFilters={setFilters}
                selectedFilter={selectedFilter}
            />
        </div>
    )
}

export default ImageFilterToolbar


