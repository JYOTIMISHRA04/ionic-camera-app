import { useState } from "react";

// useLocalStorage hook is  for managing data in local storage 
// it ensures that the component's state is always in sync with the data stored 
// in the local storage for the specified key.


const useLocalStorage = (key: string) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    });

    const setLocalStorage = (newData: any[]) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData);
    };

    const addItem = (item: any) => {
        setLocalStorage([...data, item]);
    };

    const updateItem = (index: string | number, updatedItem: any) => {
        const newData: any = [...data];
        newData[index] = updatedItem;
        setLocalStorage(newData);
    };

    const removeItem = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setLocalStorage(newData);
    };

    return {
        data,
        addItem,
        updateItem,
        removeItem,
        setData
    };
};

export default useLocalStorage;