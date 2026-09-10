export interface Product {
  urlToken: string;
  name?: string;
  thumbnail?: string;
}

export type Profile = Product;

export interface FetchProductsOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export type FetchProfilesOptions = FetchProductsOptions;
