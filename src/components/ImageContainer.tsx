import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageKonva, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import UIActionSheet from './UIActionSheet';
// import { File } from '@ionic-native/file/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


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
    React.useEffect(() => {
        if (image) {
            // you many need to reapply cache on some props changes like shadow, stroke, etc.
            imageRef.current.cache();
        }
    }, [image]);

    useEffect(() => {
        const stage = stageRef.current.getStage();
        const image = imageRef.current;
        console.log(image.getWidth())
        if (image.getWidth()) {
            const scale = scaleImageToContainer(image.getWidth(), image.getHeight(), stageWidth, stageHeight)
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

                    case "saturation":
                        image.saturation(value)
                        return
                    case "enhance":
                        image.enhance(value)
                        return
                    case "emboss":
                        image.emboss(value)
                        return
                    case "threshold":
                        image.threshold(value)
                        return
                    case "opacity":
                        image.opacity(value)
                        return
                    case "sepia":
                        image.sepia(value)
                        return
                    case "hue":
                        image.hue(value)
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

const getImageDimensions = (img: any) => {
    return new Promise((resolve, reject) => {
        img.onload = () => {
            const dimensions = {
                width: img.width,
                height: img.height,
            };

            resolve(dimensions);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
};



const ImageContainer = ({ selectedFilter, selectedImage, filterSettings, filterArray }: any) => {
    const stageRef: any = useRef(null);
    const imageRef: any = useRef(null);
    const stageWidth = window.innerWidth; // Set the desired width of the stage
    const stageHeight = window.innerHeight - 20; // Set the desired height of the stage
    const [image, state]: any = useImage(selectedImage.src, "anonymous");
    const linkRef: any = useRef(null);

    const downloadURI = (uri: any, name: string) => {
        linkRef.current.download = name;
        linkRef.current.href = uri;
        linkRef.current.click();
    };


    // const downloadURI = (uri: string, name: string) => {
    //     const link = document.createElement("a");
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const handleSaveToPdf = async () => {
        const pdf = new jsPDF('p', 'px', [stageRef.current.width(), stageRef.current.height()]);
        // then put the stage as an image on top of texts (so texts are not visible)

        const fileName = Date.now(); // name the file

        pdf.addImage(
            stageRef.current.toDataURL({ pixelRatio: 2 }),
            0,
            0,
            stageRef.current.width(),
            stageRef.current.height()
        );

        console.log(pdf.output())
        const write = await Filesystem.writeFile({
            path: selectedImage.name + ".pdf",
            data: pdf.output(),
            directory: Directory.Documents,
        }).then((resp: any) => console.log(resp));

    };

    const writeSecretFile = async (data: any) => {
        console.log(selectedImage, data, selectedImage.url, Directory.Data)
        const write = await Filesystem.writeFile({
            path: selectedImage.name,
            data: data,
            directory: Directory.Documents,
        }).then((resp: any) => console.log(resp));

        await handleSaveToPdf()
    };

    const handleSaveImage = async (event: { preventDefault: () => void; }, extension: string) => {

        const dataURL = stageRef.current.toDataURL({
            mimeType: "image/jpeg",
            quality: 100,
            pixelRatio: 2
        });
        if (extension === ".pdf") {
            await handleSaveToPdf()

            // const dataURL = stageRef.current.toDataURL({
            //     mimeType: "image/jpeg",
            //     quality: 100,
            //     pixelRatio: 2
            // });
            // await writeSecretFile(dataURL)
            return
        }
        console.log(dataURL)
        downloadURI(dataURL, "test" + extension);
    };



    return (
        <>
            <UIActionSheet onExport={(e: any, extension: string) => handleSaveImage(e, extension)} />
            <div style={{
                "height": "73vh",
                "width": stageWidth,
                "display": "flex",
                "alignItems": "center",
                "transform": "scale(0.7)"
            }} >

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
                <a ref={linkRef} style={{ display: 'none' }} />
            </div >
        </>
    )
};

export default ImageContainer
