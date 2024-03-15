import { ListingGalleryImage } from "components/ListingImageGallery/utils/types";

export const PHOTOS: string[] = [
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_0567-scaled.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/8899_36516827530_o1400px.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_8330a-1.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/8734-scaled.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/8987-scaled.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/siolim_house-6-scaled.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/siolim_house-24_36773728211_o-scaled1400px.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_0388a-1.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/8827_29412021812_o-scaled1400px.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/4189515231_c4a7619edc_o-1.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_8373a.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/IMG_8654.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/surat_4190276026_o.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/malabar_4189509255_o-1.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/siolim_house-24_36773728211_o-scaled1400px.jpg",
  "https://www.siolimhouse.com/wp-content/uploads/2020/08/8899_36516827530_o1400px.jpg",
];

export const Amenities_demos = [
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

export const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
  (item, index): ListingGalleryImage => {
    return {
      id: index,
      url: item,
    };
  }
);
