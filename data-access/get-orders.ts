export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  amount_in_cents: string;
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

export const ORDER_STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Pendente",
  completed: "Completo",
  cancelled: "Cancelado",
};

const url = process.env.API_URL;

export const getOrders = async (query?: string): Promise<OrdersResponse> => {
  const params = query || new URLSearchParams({ page: "1" }).toString();

  const response = await fetch(`${url}/orders?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const json: OrdersResponse = await response.json();

  return {
    ...json,
    data: json.data.map((order) => ({
      ...order,
      order_date: new Date(order.order_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      amount_in_cents: (
        parseInt(order.amount_in_cents, 10) / 100
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    })),
  };
};
