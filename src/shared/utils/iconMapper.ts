import {
    MdTv,
    MdKitchen,
    MdChair,
    MdBed,
    MdAcUnit,
    MdLocalLaundryService,
    MdTableRestaurant,
    MdLightbulb,
    MdSpeaker,
    MdAir,
    MdBlender,
    MdMicrowave,
    MdCoffeeMaker,
    MdOutdoorGrill,
    MdDining,
    MdWeekend,
    MdEventSeat,
    MdDeck,
    MdYard,
} from 'react-icons/md';
import { IconType } from 'react-icons';

// Map icon names (stored in database) to actual icon components
export const iconMap: Record<string, IconType> = {
    // Electronics & Appliances
    MdTv,
    MdKitchen,
    MdLocalLaundryService,
    MdAcUnit,
    MdBlender,
    MdMicrowave,
    MdCoffeeMaker,
    MdOutdoorGrill,
    MdAir,
    MdSpeaker,
    
    // Furniture & Home
    MdChair,
    MdBed,
    MdTableRestaurant,
    MdDining,
    MdWeekend,
    MdEventSeat,
    MdDeck,
    MdYard,
    
    // Lighting
    MdLightbulb,
};

// Get icon component by name, with fallback
export function getIconComponent(iconName: string | null): IconType {
    if (!iconName || !iconMap[iconName]) {
        return MdChair; // Default fallback icon
    }
    return iconMap[iconName];
}

// Get list of available icons for dropdown
export function getAvailableIcons(): Array<{ name: string; component: IconType }> {
    return Object.entries(iconMap).map(([name, component]) => ({
        name,
        component,
    }));
}
