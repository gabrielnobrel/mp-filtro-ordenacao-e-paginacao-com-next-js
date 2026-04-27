export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  amount_in_cents: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
};

type OrdersLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type OrdersMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: unknown[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type OrdersResponse = {
  data: Order[];
  links: OrdersLinks;
  meta: OrdersMeta;
};

export type OrderDTO = Pick<
  Order,
  | "customer_name"
  | "customer_email"
  | "status"
  | "order_date"
  | "amount_in_cents"
>;

const url = process.env.API_URL;

export const getOrders = async (query?: string): Promise<OrdersResponse> => {
  const params = query || new URLSearchParams({ page: "1" }).toString();

  const response = await fetch(`${url}/orders?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};
