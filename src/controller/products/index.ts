import { Request, Response } from "express";

import {
  buildSearchQuery,
  buildSortCriteria,
  executeSearchQuery,
} from "./helper";

const { Product } = require("../../model/product");

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.send(products);
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const searchQuery = buildSearchQuery(query);
    const sortCriteria = buildSortCriteria(query);
    const { total, products } = await executeSearchQuery(
      searchQuery,
      sortCriteria,
      Product,
      query.page as string,
      query.limit as string,
    );

    return res.json({ total, products });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, searchProducts };
