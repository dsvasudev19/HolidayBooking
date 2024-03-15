//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {

  id: string | number;
  name: string;
  href: string;
  title:string;
  city:string;
  featuredPropertyMedia:{path:''};
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//

interface PropertyMedia {
  path: string;
  url: string;
  file_name: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  property_typeId: number;
  propertyMedia: PropertyMedia[];
  featuredPropertyMedia: PropertyMedia;
  room: { id: number }[];
}
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  room: [];
  featuredPropertyMedia: { path: string };
  vendor: { name: string; avatar: string };
  property_typeId: number;
  propertyMedia: { path: string }[];
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  property: Property;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredPropertyMedia:{path:string},
  vendor:{name:string,avatar:string},
  property_typeId:number,
  propertyMedia:{path:string}[],
  featuredImage: string;
  room:[],
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
