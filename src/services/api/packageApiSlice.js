import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const packagesAdapter = createEntityAdapter();

const initialState = packagesAdapter.getInitialState();

// Create an entity adapter for users

export const packageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => "/api/packages",
      transformResponse: (responseData) => {
        const loadedPackages = responseData.map((pkg) => ({
          ...pkg,
          id: pkg._id, // Normalize MongoDB _id to id
        }));
        return packagesAdapter.setAll(initialState, loadedPackages);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Package", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Package", id })),
            ]
          : [{ type: "Package", id: "LIST" }],
    }),
    getPackageById: builder.query({
      // Changed from mutation to query
      query: (id) => `/api/packages/${id}`,
      transformResponse: (responseData) => ({
        ...responseData,
        id: responseData._id,
      }),
      providesTags: (result, error, id) => [{ type: "Package", id }],
    }),
    addPackage: builder.mutation({
      query: (newPackage) => ({
        url: "/api/packages",
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: [{ type: "Package", id: "LIST" }],
    }),
    updatePackage: builder.mutation({
      query: ({ id, ...updateFields }) => ({
        url: `/api/packages/${id}`,
        method: "PATCH",
        body: updateFields,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Package", id: arg.id },
      ],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/api/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Package", id },
        { type: "Package", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery, // Updated to match the query change
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApiSlice;

// Selectors
export const selectPackagesResult =
  packageApiSlice.endpoints.getPackages.select();

const selectPackagesData = createSelector(
  selectPackagesResult,
  (packagesResult) => packagesResult.data
);

export const {
  selectAll: selectAllPackages,
  selectById: selectPackageById,
  selectIds: selectPackageIds,
} = packagesAdapter.getSelectors(
  (state) => selectPackagesData(state) ?? initialState
);
