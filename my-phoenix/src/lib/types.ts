export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type OwnerProfile = {
  id?: number;
  business_tax_id: string | null;
  phone_number: string | null;
  identity_verified?: boolean;
  verification_status?: string | null;
};

export type CustomerProfile = {
  id?: number;
  phone_number: string | null;
  date_of_birth: string | null;
  dietary_preferences: string | null;
  loyalty_points?: number;
};

export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export type MenuItem = {
  id: number;
  category_id?: number;
  name: string;
  description: string | null;
  price: number | string;
  is_available: boolean;
};

export type MenuCategory = {
  id: number;
  restaurant_id?: number;
  name: string;
  menu_items?: MenuItem[];
  items?: MenuItem[];
};

export type Review = {
  id: number;
  restaurant_id?: number;
  customer_id?: number;
  customer?: { id: number; name: string } | null;
  customer_name?: string;
  rating: number;
  comment: string | null;
  owner_reply: string | null;
  created_at?: string;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  cuisine_type: string | null;
  price_range: string | null;
  average_rating?: number | string | null;
  reviews_count?: number;
  categories?: MenuCategory[];
  reviews?: Review[];
};

export type DiningLog = {
  id: number;
  restaurant_id: number | null;
  restaurant?: { id: number; name: string } | null;
  restaurant_name?: string | null;
  amount_spent: number | string;
  note: string | null;
  created_at?: string;
  logged_at?: string;
};

export type SpendingSummary = {
  month: string;
  total_spent: number | string;
  entry_count: number;
};

export type Paginated<T> = {
  data: T[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};
