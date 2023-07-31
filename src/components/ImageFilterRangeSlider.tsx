import { IonRange } from '@ionic/react'
import React, { useEffect, useState } from 'react'

const ImageFilterRangeSlider = ({ currentValue, handleSliderChange, min, max }: any) => {

    return (
        <IonRange
            value={currentValue * 100}
            min={min * 100}
            max={max * 100}
            onIonChange={handleSliderChange}
        />
    )
}

export default ImageFilterRangeSlider