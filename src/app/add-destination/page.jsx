import { redirect } from "next/navigation";

// Old route — adding packages now lives in the admin dashboard.
export default function AddDestinationRedirect() {
  redirect("/admin?tab=add");
}
