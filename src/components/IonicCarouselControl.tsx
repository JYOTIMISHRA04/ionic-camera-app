import { IonChip } from "@ionic/react";
import Konva from 'konva';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";


// Define a type for the available filters
type Filter = (imageData: any) => void; // Replace 'any' with the appropriate type for Konva filters

// Define a type/interface for the filter object
interface FilterObject {
    [key: string]: Filter;
}

export const IonicCarouselControl = ({ items, setSelectedFilter, setFilters, selectedFilter }: any) => {

    const filterObjectKonva: FilterObject = {
        brightness: Konva.Filters.Brighten,
        contrast: Konva.Filters.Contrast,
        grayscale: Konva.Filters.Grayscale,

        sepia: Konva.Filters.Sepia,

        saturation: Konva.Filters.HSL

    };

    return (
        <>
            <Swiper
                spaceBetween={2}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
            >
                {items.map((item: any) => {
                    return (
                        <SwiperSlide>
                            <IonChip outline={true}
                                onClick={() => {
                                    setSelectedFilter(item)
                                    setFilters([filterObjectKonva[item]])
                                }}
                                color={item === selectedFilter ? "primary" : "medium"}
                            >{item}
                            </IonChip>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>

    );
};
