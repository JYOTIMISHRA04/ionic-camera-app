import { useState } from 'react';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';



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


export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });
}




const useCameraHook = () => {
    const [docs, setDocs] = useState<any>([]);

    const savePicture = async (photo: any, fileName: string): Promise<any> => {
        const base64Data = await base64FromPath(photo.webPath!);
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
    };

    const scanDoc = async () => {
        const doc: any = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            quality: 100,
            width: 4000,

        });


        const img: any = new Image();
        img.src = doc.webPath;
        const dimensions: any = await getImageDimensions(img);
        const fileName = Date.now() + '.jpeg'; // name the file

        const savedFileImage = await savePicture(doc, fileName);
        const newPhotos = [{ ...savedFileImage, ...dimensions }, ...docs];
        setDocs(newPhotos);
    };

    return {
        scanDoc,
        docs
    };

}

export default useCameraHook

