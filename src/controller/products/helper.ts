import {
  SearchQuery,
  SearchQueryParams,
  SortCriteria,
  SortCriteriaParams,
} from "./products.type";

//function to build the query on the basis of query parameters. search and filtering handled in this function
export const buildSearchQuery = ({
  key,
  category,
  avail,
  minPrice,
  maxPrice,
}: SearchQueryParams) => {
  const searchQuery: any = {};
  if (key) {
    const keywordRegex = new RegExp(String(key), "i");
    searchQuery.$or = [
      { name: { $regex: keywordRegex } },
      { description: { $regex: keywordRegex } },
    ];
  }
  if (category) {
    const categoryRegex = new RegExp(String(category), "i");
    searchQuery.category = { $regex: categoryRegex };
  }
  if (avail === "1" || avail === "0") {
    searchQuery.availability = avail === "1" ? { $gt: 0 } : 0;
  }
  if (minPrice && maxPrice) {
    searchQuery.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  } else if (minPrice) {
    searchQuery.price = { $gte: Number(minPrice) };
  } else if (maxPrice) {
    searchQuery.price = { $lte: Number(maxPrice) };
  }
  return searchQuery;
};

//function to handle the sorting on the basis of query parameters. 
export const buildSortCriteria = ({
  sortByRating,
  sortByPrice,
}: SortCriteriaParams) => {
  const sortCriteria: any = {};
  if (sortByRating) {
    sortCriteria.rating = Number(sortByRating);
  }
  if (sortByPrice) {
    sortCriteria.price = Number(sortByPrice);
  }
  return sortCriteria;
};

//function that takes the query that's build before and gives the paginated results.
export const executeSearchQuery = async (
  searchQuery: SearchQuery,
  sortCriteria: SortCriteria,
  Product: any,
  page?: string,
  limit?: string
) => {
  const queryBuilder = Product.find(searchQuery);
  const documentCountPromise = Product.countDocuments(searchQuery);
  if (Object.keys(sortCriteria).length > 0) {
    queryBuilder.sort(sortCriteria);
  }
  if (limit && page) {
    queryBuilder.skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
  }
  const [total, products] = await Promise.all([
    documentCountPromise,
    queryBuilder.exec(),
  ]);
  return { total, products };
};
