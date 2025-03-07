import { ColumnDef } from "@tanstack/react-table";
import { BellRing, SearchIcon, TruckIcon, XIcon } from "lucide-react";

import { teamApi } from "@/api";
import DataTable from "@/components/DataTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/Loader";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type FilterOptionsType = {
  name?: string;
};

const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    filterFn: "equals",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "count",
    header: () => <div className="text-center">Count</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("count")}</div>
    ),
  },
];

export default function TeamsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptionsType | undefined>();
  const [options, setOptions] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["teams", page, 10, options],
    queryFn: () => teamApi.all(page, 10, options),
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    let query = "";
    if (filters?.name) {
      query += `&name=${filters?.name}`;
    }
    setOptions(query);
  };

  const handleReset = () => {
    setFilters(undefined);
    setOptions(undefined);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-yellow-500/25 text-yellow-500"
            title="Total Teams"
            value="24"
          />
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-violet-500/25 text-violet-500"
            title="Total User"
            value="16"
          />
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-pink-500/25 text-pink-500"
            title="Total Incoming"
            value="8"
          />
          <ReportCard
            icon={<TruckIcon />}
            iconColor="bg-cyan-500/25 text-cyan-500"
            title="Outgoing Pending"
            value="8"
          />
        </div>
        <div className="my-4 flex w-full items-center justify-end space-x-2">
          <Input
            placeholder="Search by Team name"
            value={filters?.name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />
          <Button type="button" onClick={handleSearch}>
            <SearchIcon />
          </Button>
          <Button type="button" onClick={handleReset} variant="destructive" disabled={options === undefined}>
            <XIcon />
          </Button>
        </div>
        <div className="rounded-md border">
          {isLoading && <Loader />}
          <DataTable columns={columns} data={data?.data?.results ?? []} />
        </div>
      </div>
    </DashboardLayout>
  );
}
