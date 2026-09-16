import { redirect } from "@/i18n/navigation";

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

// old /portfolio link -> /profile
export default async function PortfolioRedirectPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  redirect({ href: "/profile", locale });
}
