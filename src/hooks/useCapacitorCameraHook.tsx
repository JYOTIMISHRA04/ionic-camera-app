import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem';
import { DocumentScanner } from 'capacitor-document-scanner'
import { useEffect, useState } from 'react'

const getImageDimensions = async (img: any) => {
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



const useCapacitorCameraHook = () => {
    const init = JSON.stringify([{
        name: "helo",
        src: `public/test.jpg`
    }])
    const [scannedDocs, setScannedDoc]: any = useState(() => {
        const storedData = localStorage.getItem("images") || init;
        return storedData ? JSON.parse(storedData) : JSON.stringify(init);
    })

    const setLocalStorage = (newData: any[]) => {
        localStorage.setItem("images", JSON.stringify(newData));
        setScannedDoc(newData);
    };

    const addItem = (item: any) => {
        setLocalStorage([...scannedDocs, item]);
    };

    const updateItem = (index: string | number, updatedItem: any) => {
        const newData: any = [...scannedDocs];
        newData[index] = updatedItem;
        setLocalStorage(newData);
    };

    const removeItem = (index: number) => {
        const newData = [...scannedDocs];
        newData.splice(index, 1);
        setLocalStorage(newData);
    };

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

    const scanDocument = async () => {
        // start the document scanner
        const { scannedImages }: any = await DocumentScanner.scanDocument()

        // get back an array with scanned image file paths
        if (scannedImages.length > 0) {
            // set the img src, so we can view the first scanned image
            const newMapped = scannedImages.map((item: any) => {
                const img: any = new Image();
                img.src = item.src;
                // const dimensions: any = await getImageDimensions(img);
                return {
                    name: Date.now() + '.jpeg', // name the file
                    src: Capacitor.convertFileSrc(item),
                    // dimention: dimensions
                }
            })
            const newData = [...newMapped, ...scannedDocs]
            setScannedDoc(newData)
        }
    }

    return { scanDocument, scannedDocs, addItem, updateItem, removeItem }
}

export default useCapacitorCameraHook

