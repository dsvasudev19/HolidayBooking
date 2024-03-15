import __taxonomies from "./jsons/__taxonomies.json";
import __stayTaxonomies from "./jsons/__stayTaxonomies.json";
import __experiencesTaxonomies from "./jsons/__experiencesTaxonomies.json";
import { TaxonomyType } from "./types";

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
  city: "Goa",
  featuredPropertyMedia: { path: "" },
  title: "All",
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  title: "All",
  city: "Goa",
  featuredPropertyMedia: { path: "" },
  taxonomy: "tag",
}));

//

const DEMO_STAY_CATEGORIES: TaxonomyType[] = __stayTaxonomies.map((item) => ({
  ...item,
  title: "All",
  taxonomy: "category",
  city: "Goa",
  featuredPropertyMedia: { path: "" },
  listingType: "stay",
}));
//
const DEMO_EXPERIENCES_CATEGORIES: TaxonomyType[] = __experiencesTaxonomies.map(
  (item) => ({
    ...item,
    title: "All",
    city: "Goa",
    taxonomy: "category",
    featuredPropertyMedia: { path: "" },
    listingType: "experiences",
  })
);

export {
  DEMO_CATEGORIES,
  DEMO_TAGS,
  DEMO_STAY_CATEGORIES,
  DEMO_EXPERIENCES_CATEGORIES,
};
