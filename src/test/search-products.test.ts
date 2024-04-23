import {
  buildSearchQuery,
  buildSortCriteria,
  executeSearchQuery,
} from "../controller/products/helper";

import { SearchQuery } from "../controller/products/products.type";
import { mockProducts } from "./data";

describe("buildSearchQuery function", () => {
  it("should build search query based on request query parameters", () => {
    const query = {
      key: "example",
      avail: "1",
      minPrice: "10",
      maxPrice: "50",
    };

    const searchQuery = buildSearchQuery(query);

    expect(searchQuery).toEqual({
      $or: [
        { name: { $regex: new RegExp("example", "i") } },
        { description: { $regex: new RegExp("example", "i") } },
      ],
      availability: { $gt: 0 },
      price: { $gte: 10, $lte: 50 },
    });
  });
});

describe("buildSortCriteria function", () => {
  it("should build sort criteria based on request query parameters", () => {
    const query = {
      sortByRating: "1",
      sortByPrice: "-1",
    };

    const sortCriteria = buildSortCriteria(query);

    expect(sortCriteria).toEqual({
      rating: 1,
      price: -1,
    });
  });
});

describe("executeSearchQuery function", () => {
  it("should execute search query with sort criteria, pagination, and return total count and products", async () => {
    const searchQuery: SearchQuery = {
      $or: [{ name: new RegExp("example", "i") }],
    };
    const sortCriteria = { rating: 1 };
    const page = "1";
    const limit = "10";

    const mockTotal = mockProducts.length;

    const findMock = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockProducts),
    });

    const countDocumentsMock = jest.fn().mockResolvedValue(mockTotal);

    const Product = {
      find: findMock,
      countDocuments: countDocumentsMock,
    };

    const result = await executeSearchQuery(
      searchQuery,
      sortCriteria,
      Product,
      page,
      limit
    );

    expect(result).toEqual({ total: mockTotal, products: mockProducts });
    expect(findMock).toHaveBeenCalledWith(searchQuery);
    expect(findMock().sort).toHaveBeenCalledWith(sortCriteria);
    expect(findMock().skip).toHaveBeenCalledWith((Number(page) - 1) * Number(limit));
    expect(findMock().limit).toHaveBeenCalledWith(Number(limit));
    expect(countDocumentsMock).toHaveBeenCalledWith(searchQuery);
  });
});
