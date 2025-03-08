import {
  ColumnDef
} from "@tanstack/react-table";
import {
  BellRing,
  SearchIcon,
  XIcon
} from "lucide-react";
import * as React from "react";

import { incomingApi } from "@/api";
import DataTable from "@/components/DataTable";
import ExportCSV from "@/components/ExportCSV";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/Loader";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

type FilterOptionsType = {
  name?: string;
  status?: string;
};

const columns: ColumnDef<Incoming>[] = [
  {
    id: "select-col",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("userId")}</div>,
    filterFn: "equals",
  },
  {
    accessorKey: "sampleType",
    header: "SampleType",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sampleType")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "receiverName",
    header: "ReceiverName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("receiverName")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "companyName",
    header: "CompanyName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("companyName")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
    filterFn: "equals",
  },
];

export default function IncomingSamplePage() {
  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState<FilterOptionsType | undefined>();
  const [options, setOptions] = React.useState<string>();

  const [rowSelection, setRowSelection] = React.useState({});

  const query = useQuery({
    queryKey: ["incomings", page, 10, options],
    queryFn: () => incomingApi.all(page, 10, options),
    refetchOnWindowFocus: false,
  });

  const reportsQuery = useQuery({
    queryKey: ["incomings-reports"],
    queryFn: () => incomingApi.getReports(),
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    let query = "";
    if (filters?.name) {
      query += `&name=${filters?.name}`;
    }
    if (filters?.status) {
      query += `&status=${filters?.status}`;
    }
    setOptions(query);
  };

  const handleReset = () => {
    setFilters(undefined);
    setOptions(undefined);
  };

  async function mock() {
    setLoading(true);
    await incomingApi.mock();
    setLoading(false);
    query.refetch();
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-yellow-500/25 text-yellow-500"
            title="Total Sample"
            value={reportsQuery.data?.total ?? 0}
          />
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-violet-500/25 text-violet-500"
            title="Pending"
            value={reportsQuery.data?.pending ?? 0}
          />
          <ReportCard
            icon={<BellRing />}
            iconColor="bg-pink-500/25 text-pink-500"
            title="Total Received"
            value={reportsQuery.data?.delivered ?? 0}
          />
        </div>
        <div className="my-4 flex w-full items-center justify-end space-x-2">
          <Input
            placeholder="Search by userId/Name/Company/Type"
            value={filters?.name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />
          <Select
            onValueChange={(value: string) =>
              setFilters({ ...filters, status: value })
            }
            value={filters?.status ?? ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Queued">Queued</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="button" onClick={handleSearch}>
            <SearchIcon />
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="destructive"
            disabled={options === undefined}
          >
            <XIcon />
          </Button>
          <ExportCSV
            data={
              query.data?.data?.results?.filter((item: Incoming) =>
                Object.keys(rowSelection).includes(item.id)
              ) ?? []
            }
            fileName="incomings.csv"
          />
          <Button
            type="button"
            disabled={loading || query.data?.data?.results?.length !== 0}
            onClick={mock}
          >
            Mock Data
          </Button>
        </div>
        <div className="rounded-md border">
          {query.isLoading && <Loader />}
          <DataTable
            columns={columns}
            data={query.data?.data?.results ?? []}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            pagination={{
              currentPage: page,
              onPageChange: (page) => setPage(page),
              totalPages: query.data?.data?.totalPages ?? 0,
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
