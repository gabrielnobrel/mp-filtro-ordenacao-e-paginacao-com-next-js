import FilterDropdown from "@/components/filter-dropdown";
import OrdersTable from "@/components/orders-table";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search-input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrders } from "@/data-access/get-orders";
import { redirect } from "next/navigation";

export default async function Component({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;

  if (!resolvedParams.page) {
    redirect(`?page=1`);
  }

  const query = new URLSearchParams(
    resolvedParams as Record<string, string>,
  ).toString();

  const data = await getOrders(query);

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable {...data} />
          <div className="mt-8">
            <Pagination meta={data.meta} searchParams={resolvedParams} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
