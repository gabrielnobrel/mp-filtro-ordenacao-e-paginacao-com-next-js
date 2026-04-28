"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { ORDER_STATUS_LABELS } from "@/data-access/get-orders";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { label: "Todos", value: "" },
  { label: "Pendente", value: "pending" },
  { label: "Completo", value: "completed" },
];

export default function FilterDropdown() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedValue, setSelectedValue] = useState("Status");

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);

    setSelectedValue(
      value === ""
        ? "Todos"
        : ORDER_STATUS_LABELS[value as keyof typeof ORDER_STATUS_LABELS],
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"default"}
          className="flex gap-2 text-slate-600"
        >
          <Filter className="h-4 w-4" />
          {selectedValue}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedValue}
          onValueChange={handleSelect}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
