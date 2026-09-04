"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { message } from "antd";
import { api, extractErrorMessage } from "./api";
import { unwrap, unwrapList } from "./unwrap";
import type {
  CustomerProfile,
  DiningLog,
  MenuCategory,
  MenuItem,
  OwnerProfile,
  Restaurant,
  Review,
  SpendingSummary,
  RestaurantAnalytics,
} from "./types";

/* ---------------------------------- public --------------------------------- */

export type RestaurantFilters = {
  page?: number | undefined;
  cuisine_type?: string | undefined;
  price_range?: string | undefined;
  min_rating?: number | undefined;
};

export type RestaurantListResult = {
  items: Restaurant[];
  total: number;
  perPage: number;
  currentPage: number;
};

export function usePublicRestaurants(filters: RestaurantFilters) {
  return useQuery({
    queryKey: ["restaurants", filters] as QueryKey,
    queryFn: async (): Promise<RestaurantListResult> => {
      const { data } = await api.get("/restaurants", { params: filters });
      const container = unwrap<Record<string, unknown>>(data);
      const items = unwrapList<Restaurant>(data);
      const meta = (container?.["meta"] as Record<string, unknown> | undefined) ?? container ?? {};
      return {
        items,
        total: Number(meta["total"] ?? items.length),
        perPage: Number(meta["per_page"] ?? 12),
        currentPage: Number(meta["current_page"] ?? filters.page ?? 1),
      };
    },
  });
}

export function usePublicRestaurant(id: string | number) {
  return useQuery({
    queryKey: ["restaurant", String(id)],
    queryFn: async () => {
      const { data } = await api.get(`/restaurants/${id}`);
      return unwrap<Restaurant>(data);
    },
  });
}

export function useRestaurantSearch(q: string) {
  return useQuery({
    queryKey: ["restaurant-search", q],
    queryFn: async () => {
      const { data } = await api.get("/search/restaurants", { params: { q } });
      return unwrapList<Restaurant>(data);
    },
    enabled: q.trim().length > 0,
  });
}

/* ----------------------------------- owner --------------------------------- */

export function useOwnerMe(enabled: boolean) {
  return useQuery({
    queryKey: ["owner", "me"],
    queryFn: async () => unwrap<{ name: string; email: string }>((await api.get("/owner/me")).data),
    enabled,
  });
}

export function useOwnerProfile(enabled = true) {
  return useQuery({
    queryKey: ["owner", "profile"],
    queryFn: async () => unwrap<OwnerProfile>((await api.get("/owner/profile")).data),
    enabled,
  });
}

export function useOwnerRestaurants(enabled = true) {
  return useQuery({
    queryKey: ["owner", "restaurants"],
    queryFn: async () => unwrapList<Restaurant>((await api.get("/owner/restaurants")).data),
    enabled,
  });
}

export function useOwnerRestaurant(id: string | number, enabled = true) {
  return useQuery({
    queryKey: ["owner", "restaurant", String(id)],
    queryFn: async () =>
      unwrap<Restaurant>((await api.get(`/owner/restaurants/${id}`)).data),
    enabled,
  });
}

export function useOwnerCategories(restaurantId: string | number, enabled = true) {
  return useQuery({
    queryKey: ["owner", "categories", String(restaurantId)],
    queryFn: async () =>
      unwrapList<MenuCategory>(
        (await api.get(`/owner/restaurants/${restaurantId}/categories`)).data,
      ),
    enabled,
  });
}

export function useCategoryMenuItems(categoryId: number, enabled = true) {
  return useQuery({
    queryKey: ["owner", "menu-items", categoryId],
    queryFn: async () =>
      unwrapList<MenuItem>((await api.get(`/owner/categories/${categoryId}/menu-items`)).data),
    enabled,
  });
}

export function useOwnerRestaurantReviews(restaurantId: string | number, enabled = true) {
  return useQuery({
    queryKey: ["owner", "reviews", String(restaurantId)],
    queryFn: async () =>
      unwrapList<Review>((await api.get(`/owner/restaurants/${restaurantId}/reviews`)).data),
    enabled,
  });
}

/* --------------------------------- customer -------------------------------- */

export function useCustomerProfile(enabled = true) {
  return useQuery({
    queryKey: ["customer", "profile"],
    queryFn: async () => unwrap<CustomerProfile>((await api.get("/customer/profile")).data),
    enabled,
  });
}

export function useDiningLogs(month: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ["customer", "dining-logs", month ?? "all"],
    queryFn: async () =>
      unwrapList<DiningLog>(
        (await api.get("/customer/dining-logs", { params: month ? { month } : {} })).data,
      ),
    enabled,
  });
}

export function useSpendingSummary(month: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ["customer", "dining-summary", month ?? "current"],
    queryFn: async () =>
      unwrap<SpendingSummary>(
        (await api.get("/customer/dining-logs/summary", { params: month ? { month } : {} })).data,
      ),
    enabled,
  });
}

/* -------------------------------- mutations -------------------------------- */

type MutationConfig<TVars> = {
  request: (vars: TVars) => Promise<unknown>;
  invalidate?: QueryKey[];
  successMessage?: string;
};

export function useApiMutation<TVars>({
  request,
  invalidate = [],
  successMessage,
}: MutationConfig<TVars>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      if (successMessage) message.success(successMessage);
      invalidate.forEach((key) => void queryClient.invalidateQueries({ queryKey: key }));
    },
    onError: (error: unknown) => {
      message.error(extractErrorMessage(error));
    },
  });
}

export function useOwnerRestaurantAnalytics(id: string | number, enabled: boolean) {
  return useQuery({
    queryKey: ["owner", "restaurant", id, "analytics"],
    queryFn: async () => {
      const { data } = await api.get(`/owner/restaurants/${id}/analytics`);
      return (data as unknown as { data?: RestaurantAnalytics }).data ?? (data as RestaurantAnalytics);
    },
    enabled: enabled && Boolean(id),
  });
}
