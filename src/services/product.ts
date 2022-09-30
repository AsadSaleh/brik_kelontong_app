import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  _id: string;
  id: number;
  categoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  harga: number;
}

interface QueryOptions {
  offset?: number;
  limit?: number;
  filter?: string;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crudcrud.com/api/59ade9bb7f7d455d8000cc4326330c36',
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProductById: builder.query<Product, string>({
      query: id => `/test-product/${id}`,
    }),
    getAllProducts: builder.query<
      Array<Product>,
      undefined | null | QueryOptions
    >({
      query: () => '/test-product',
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<number, Omit<Partial<Product>, '_id'>>({
      invalidatesTags: ['Product'],
      query: body => {
        console.log('body: ', body);
        return {
          url: '/test-product/post',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        };
      },
    }),
    generateRandomProduct: builder.mutation<number, any>({
      invalidatesTags: ['Product'],
      query: () => ({
        url: '/test-product/post',
        method: 'POST',
        body: {
          id: 1234,
          categoryId: 123,
          categoryName: 'Makanan',
          sku: '123321',
          name: 'Taro',
          description: 'Taro ciki paling enak',
          weight: 500,
          width: 20,
          length: 20,
          height: 10,
          image:
            'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/1/30/619af43f-c925-479a-9489-22eb4941ba52.jpg',
          harga: 40000,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetProductByIdQuery,
  useGenerateRandomProductMutation,
} = productApi;
