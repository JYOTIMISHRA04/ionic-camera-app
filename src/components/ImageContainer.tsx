import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageKonva, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import UIActionSheet from './UIActionSheet';
// import { File } from '@ionic-native/file/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { changeDpiDataUrl } from "changedpi"

function scaleImageToContainer(imageWidth: number, imageHeight: number, containerWidth: number, containerHeight: number) {
    // Calculate the aspect ratio of the image
    const imageAspectRatio = imageWidth / imageHeight;

    // Calculate the aspect ratio of the container
    const containerAspectRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (imageAspectRatio > containerAspectRatio) {
        // Image is wider than the container
        newWidth = containerWidth;
        newHeight = containerWidth / imageAspectRatio;
    } else {
        // Image is taller than or equal to the container
        newHeight = containerHeight;
        newWidth = containerHeight * imageAspectRatio;
    }

    // Check if the new dimensions exceed the container bounds
    if (newWidth > containerWidth) {
        newWidth = containerWidth;
        newHeight = containerWidth / imageAspectRatio;
    }

    if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = containerHeight * imageAspectRatio;
    }

    return { width: newWidth, height: newHeight };
}

const FilterImage = ({ image, stageRef, filterSettings, stageWidth, stageHeight, filterArray, selectedFilter }: any) => {
    const imageRef: any = React.useRef(null);
    const [scale, setScale] = useState({ width: stageWidth, height: stageHeight })

    // when image is loaded we need to cache the shape
    useEffect(() => {
        if (image) {
            // you many need to reapply cache on some props changes like shadow, stroke, etc.
            imageRef.current.cache();
        }
    }, [image]);

    function scaleImageToFitContainer(containerWidth: number, containerHeight: number, imageWidth: number, imageHeight: number) {
        const widthRatio = containerWidth / imageWidth;
        const heightRatio = containerHeight / imageHeight;

        // Use the smaller ratio to scale the image uniformly
        // const scaleFactor = Math.min(widthRatio, heightRatio);

        const scaledWidth = imageWidth / widthRatio;
        const scaledHeight = imageHeight / heightRatio

        return {
            width: scaledWidth,
            height: scaledHeight
        };
    }


    useEffect(() => {
        const stage = stageRef.current.getStage();
        const image = imageRef.current;
        if (image.getWidth()) {
            const scale = scaleImageToFitContainer(stageWidth, stageHeight, image.getWidth(), image.getHeight())
            setScale(scale)

            image.getLayer().batchDraw();
            const switchFilters = (filter: string, value: any) => {
                switch (filter) {
                    case "brightness":
                        image.brightness(value)
                        return
                    case "contrast":
                        image.contrast(value)
                        return
                    case "grayScale":
                        image.grey(value)
                        return

                    case "enhance":
                        image.enhance(value)
                        return


                    case "sepia":
                        image.sepia(value)
                        return


                    default:
                        break;
                }
            }
            switchFilters(selectedFilter, filterSettings[selectedFilter])

            image.filters(filterArray);
            image.cache();
            stage.batchDraw();
        }
    }, [filterSettings]);
    console.log(stageWidth, stageHeight, image.getWidth(), image.getHeight())

    return (
        <ImageKonva
            ref={imageRef}
            image={image}
            width={scale.width}
            height={scale.height}
            filters={filterArray}
            draggable={true}
        />

    );
};

// const getImageDimensions = (img: any) => {
//     return new Promise((resolve, reject) => {
//         img.onload = () => {
//             const dimensions = {
//                 width: img.width,
//                 height: img.height,
//             };

//             resolve(dimensions);
//         };

//         img.onerror = () => {
//             reject(new Error('Failed to load image'));
//         };
//     });
// };



const ImageContainer = ({ selectedFilter, selectedImage, filterSettings, filterArray }: any) => {
    const stageRef: any = useRef(null);
    const imageRef: any = useRef(null);
    const stageWidth = window.innerWidth; // Set the desired width of the stage
    const stageHeight = window.innerHeight; // Set the desired height of the stage
    const [image, state]: any = useImage(selectedImage.src, "anonymous");
    const linkRef: any = useRef(null);

    const handleSaveImage = async (event: { preventDefault: () => void; }, extension: string) => {
        const fileName = Date.now() + extension;

        let dataURL = stageRef.current.toDataURL({
            mimeType: ".pdf.jpeg".includes(extension) ? "image/jpeg" : "image/png",
            quality: 100,
            pixelRatio: 2
        });

        if (extension === ".pdf") {
            PDFGenerator.fromData(`<div style="width: 21cm; height: 29.7cm; background-image: url(${dataURL}); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>`, { documentSize: "A4", fileName: "helo.pdf" }).then(base64String => {
                try {
                    Filesystem.writeFile({
                        path: fileName,
                        data: base64String,
                        directory: Directory.Data,
                    }).then((writeFileResult) => {
                        Filesystem.getUri({
                            directory: Directory.Data,
                            path: fileName
                        }).then((getUriResult) => {
                            const path = getUriResult.uri;

                            FileOpener.open(path, 'application/pdf')
                                .then(() => console.log('File is opened'))
                                .catch((error: any) => console.log('Error openening file', error));
                        }, (error) => {
                            console.log(error);
                        });
                    });
                    console.log('writeFile complete');
                } catch (error) {
                    console.error('Unable to write file', error);
                }
                return
            });
            return
        }
        const newURl = await changeDpiDataUrl(dataURL as string, 300)
        const result = await Filesystem.writeFile({
            path: fileName,
            data: newURl,
            directory: Directory.Data, // You can choose the appropriate directory
        });

        return result.uri;
    };



    return (
        <>
            <UIActionSheet onExport={(e: any, extension: string) => handleSaveImage(e, extension)} />
            {/* <div style={{
                "width": stageWidth,
                "display": "flex",
                "alignItems": "center",
            }} > */}

            <Stage width={stageWidth} height={(stageHeight)} ref={stageRef}>
                <Layer>
                    {state === "loaded" && <FilterImage
                        image={image}
                        ref={imageRef}
                        filterSettings={filterSettings}
                        stageRef={stageRef}
                        stageHeight={stageHeight}
                        stageWidth={stageWidth}
                        filterArray={filterArray}
                        selectedFilter={selectedFilter}
                        dpi={300}
                        handleSaveImage={handleSaveImage}
                    />}
                </Layer>
            </Stage>
            {/* </div > */}
        </>
    )
};

export default ImageContainer
