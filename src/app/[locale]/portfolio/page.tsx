import { redirect } from "@/i18n/navigation";

/** Old /portfolio route now redirects to the Profile page. */
export default async function PortfolioRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/profile", locale });
}
