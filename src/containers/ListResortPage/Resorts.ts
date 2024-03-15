import { ListingGalleryImage } from "components/ListingImageGallery/utils/types";

export const ResortPhotos: string[] = [
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-exterior-2324-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-aerial-view-3557-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-porte-2327-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-backyard-3526-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-living-room-3531-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-living-room-3530-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-queenwonderful-guestroom-0163-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://s7d1.scene7.com/is/image/marriotts7prod/goiwh-marvelousgarden-chaletview-0160:Classic-Hor?wid=1215&fit=constrain",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-kingmarvelous-garden-0159-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-wee-kids-3549-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-spa-room-3539-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-spa-room-3539-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_8654.jpg",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-spa-room-3539-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-reflective-pond-3533-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*",
    "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-villa-exterior-3528-hor-clsc.jpg?output-quality=70&interpolation=https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-attraction-sea-7748-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*g",
];

export const Resort_demos = [
    { name: "Entry Card", icon: "la-key" },
    { name: "Luggage Storage", icon: "la-luggage-cart" },
    { name: "Bathrooms", icon: "la-shower" },
    { name: "Smoking Zone", icon: "la-smoking" },
    { name: "Artifical Snow Zone", icon: "la-snowflake" },
    { name: "Spa", icon: "la-spa" },
    { name: "Documents Storage", icon: "la-suitcase" },
    { name: "Public Pool", icon: "la-swimmer" },
    { name: "Private Pool", icon: "la-swimming-pool" },
    { name: "Electronics", icon: "la-tv" },
    { name: "Beach Stay", icon: "la-umbrella-beach" },
    { name: "Dinning", icon: "la-utensils" },
    { name: "HandyCapped", icon: "la-wheelchair" },
    { name: "Wifi", icon: "la-wifi" },
    { name: "Baby Vehicle", icon: "la-baby-carriage" },
    { name: "Bath Tub", icon: "la-bath" },
    { name: "King Size Bed's", icon: "la-bed" },
    { name: "Wallet Parking", icon: "la-car" },
    { name: "Bar", icon: "la-cocktail" },
    { name: "Coffee", icon: "la-coffee" },
    { name: "Door Service", icon: "la-concierge-bell" },
    { name: "Gym", icon: "la-dumbbell" },
    { name: "Private Hot Tube", icon: "la-hot-tub" },
    { name: "Infinity Pool", icon: "la-infinity" },
];

export const imageGallery: ListingGalleryImage[] = [...ResortPhotos].map(
    (item, index): ListingGalleryImage => {
        return {
            id: index,
            url: item,
        };
    }
);
