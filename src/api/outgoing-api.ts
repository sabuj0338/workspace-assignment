import { friday } from "@/lib/Friday";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export async function all(
  page: number = 1,
  limit: number = 10,
  options: string = ""
) {
  const res = await friday.get(
    new URL(`${BASE_API_URL}/outgoings?page=${page}&limit=${limit}&${options}`)
  );

  return res?.data;
}

export async function getReports() {
  const res = await friday.get(new URL(`${BASE_API_URL}/outgoings/reports`));

  return res?.data?.data;
}

export async function mock() {
  const res = await friday.get(new URL(`${BASE_API_URL}/outgoings/mock`));

  return res?.data;
}
