export interface SearchQueryParams {
  key?: string;
  category?: string;
  avail?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface SortCriteriaParams {
  sortByRating?: string;
  sortByPrice?: string;
}

export interface SearchQuery {
  $or?: { name?: RegExp; description?: RegExp }[];
  category?: string;
  availability?: number;
  price?: { $gte?: number; $lte?: number };
}

export interface SortCriteria {
  rating?: number;
  price?: number;
}

export interface SearchResult {
  total: number;
  products: Product[];
}

export interface Product {
  name: string;
  description: string;
  category: string;
  availability: number;
  price: number;
  rating: number;
}
