import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import React from "react";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Goa",
    title: "Goa",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    href: "#",
    name: "Jaipur",
    title: "Jaipur",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    city: "Goa",
    count: 8288,
    thumbnail:
      "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    href: "#",
    name: "Hyderabad",
    title: "Hyderabad",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://imgs.search.brave.com/sfpTUajmT8dfI4j1DKjJGdECj2_ay0hxKIzMat3fPg8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hZ29k/YS1mb3J0LWJlYWNo/LWdvYS1uaWNlLXZp/ZXctdG8taGF2ZS1n/bGltcHNlLXNlYS0x/ODAzOTIyMzkuanBn",
  },
  {
    id: "2",
    href: "#",
    name: "Banglore",
    title: "Banglore",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://imgs.search.brave.com/1Lx2MY-ZQV9wM5twWQIg00hmnh_zTfgWAZHcT2_V5UQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTk1/NDk4MTUyL3Bob3Rv/L2xpdHRsZS12YWdh/dG9yLXN1bnNldC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/U2VieHhzRTU3c05C/eXdtd3B5WVhXU0Ew/NTh0SktyY253N3Ax/YnB2enJ0WT0 ",
  },
  {
    id: "2",
    href: "#",
    name: "Kochi",
    title: "Kochi",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://images.unsplash.com/photo-1642313281504-77925e214635?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGdvYXxlbnwwfDF8MHx8fDA%3D",
  },
  {
    id: "2",
    href: "#",
    name: "Delhi",
    title: "Delhi",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.unsplash.com/photo-1693139441439-95ddfb2ecdba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "11",
    href: "#",
    name: "Chennai",
    title: "Chennai",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://imgs.search.brave.com/juaLuoTkB6YV5BwyP5iOctS1gcjJMPNWcNRv3INl7ek/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJpcHNhdnZ5LmNv/bS90aG1iL1NqdTNw/Y0hxTGp1c1I2cTgx/QV9zcTVOeXRRND0v/MTUwMHgwL2ZpbHRl/cnM6bm9fdXBzY2Fs/ZSgpOm1heF9ieXRl/cygxNTAwMDApOnN0/cmlwX2ljYygpL0dl/dHR5SW1hZ2VzLTU0/MTUwNjY2Ni01OTBh/YTY5MDVmOWI1ODY0/NzBiYjNkNzEuanBn",
  },
  {
    id: "222",
    href: "#",
    name: "Mumbai",
    title: "Mumbai",
    city: "Goa",
    featuredPropertyMedia: { path: "" },
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://imgs.search.brave.com/ErrHuA0ZaRZMZW-jddhVcBNzVu9OgiEUjixkq94pZzA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/c3RhdGljYWxseS5p/by9pbWcvd3d3LmRv/bWluaWNhbmFicm9h/ZC5jb20vZj1hdXRv/LHE9OTAvd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMTEvdGhp/bmdzLXRvLWRvLWlu/LXBhbmppbS0yLmpw/Zw",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places while you can"
        isCenter={headingCenter}
      >
        Explore a New City
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
            <CardComponentName key={i} taxonomy={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
