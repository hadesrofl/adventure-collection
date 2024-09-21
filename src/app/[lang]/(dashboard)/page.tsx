import { redirect } from "next/navigation";
import AppRoutes from "@routes/appRoutes";

export default async function LandingPage() {
  redirect(AppRoutes.adventureRoutes.collection);
}
