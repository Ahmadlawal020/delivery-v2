import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const packagesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.deliveryStatus === "Delivered" ? 1 : -1),
});

const initialState = packagesAdapter.getInitialState();

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
      providesTags: (result, error, arg) =>
        result?.ids
          ? [
              { type: "Package", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Package", id })),
            ]
          : [{ type: "Package", id: "LIST" }],
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
      query: ({ id }) => ({
        url: `/api/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Package", id: "LIST" }],
    }),
    assignDeliveryPerson: builder.mutation({
      query: ({ id, deliveryPersonId }) => ({
        url: `/api/packages/${id}/assign`,
        method: "PATCH",
        body: { deliveryPersonId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Package", id: arg.id },
      ],
    }),
    updateDeliveryStatus: builder.mutation({
      query: ({ id, deliveryStatus, paymentStatus }) => ({
        url: `/api/packages/${id}/status`,
        method: "PATCH",
        body: { deliveryStatus, paymentStatus },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Package", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useAssignDeliveryPersonMutation,
  useUpdateDeliveryStatusMutation,
} = packageApiSlice;

// Selectors
export const selectPackagesResult =
  packageApiSlice.endpoints.getPackages.select();

const selectPackagesData = createSelector(
  selectPackagesResult,
  (packagesResult) => packagesResult.data ?? initialState
);

export const {
  selectAll: selectAllPackages,
  selectById: selectPackageById,
  selectIds: selectPackageIds,
} = packagesAdapter.getSelectors((state) => selectPackagesData(state));
