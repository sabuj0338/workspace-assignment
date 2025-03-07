import { teamApi } from "@/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  async function mock() {
    setLoading(true);
    await teamApi.mock();
    setLoading(false);
  }
  return (
    <Card className="rounded-none border-0 shadow-xs mt-3 py-0">
      <CardHeader className="p-0">
        <ul className="tab-list flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li
            className={cn(
              "tab",
              pathname === "/dashboard/incoming-sample" ? "active-tab" : ""
            )}
          >
            <Link to="/dashboard/incoming-sample">Incoming Sample</Link>
          </li>
          <li
            className={cn(
              "tab",
              pathname === "/dashboard/outgoing-sample" ? "active-tab" : ""
            )}
          >
            <Link to="/dashboard/outgoing-sample">Outgoing Sample</Link>
          </li>
          <li
            className={cn(
              "tab",
              pathname === "/dashboard/teams" ? "active-tab" : ""
            )}
          >
            <Link to="/dashboard/teams">Teams</Link>
          </li>
        </ul>
        <div className="px-6">
          <Button type="button" disabled={loading} onClick={mock}>
            Mock Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
