"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import {
  Order,
  ORDER_STATUS_LABELS,
  OrdersResponse,
} from "@/data-access/get-orders";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OrdersTable(data: OrdersResponse) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const current = params.get("sort");

  const handleClickSortDate = () => {
    params.set("page", "1");
    params.set("sort", current === "order_date" ? "-order_date" : "order_date");
    replace(`?${params.toString()}`);
  };

  const handleClickSortAmount = () => {
    params.set("page", "1");
    params.set(
      "sort",
      current === "amount_in_cents" ? "-amount_in_cents" : "amount_in_cents",
    );
    replace(`?${params.toString()}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={handleClickSortDate}
          >
            <div className="flex items-center gap-1">
              Data
              {current === "order_date" ? (
                <ChevronUp className="w-4" />
              ) : (
                <ChevronDown className="w-4" />
              )}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={handleClickSortAmount}
          >
            Valor
            {current === "amount_in_cents" ? (
              <ChevronUp className="w-4" />
            ) : (
              <ChevronDown className="w-4" />
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((order: Order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {ORDER_STATUS_LABELS[order.status]}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.order_date}
            </TableCell>
            <TableCell className="text-right">
              {order.amount_in_cents}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
