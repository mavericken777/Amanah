import { getClaims } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const claims = await getClaims();
  redirect(claims?.sub ? "/dashboard" : "/login");
}
