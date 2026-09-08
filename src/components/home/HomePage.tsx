/**
 * Home page composer — receives GET /home data and renders sections.
 */
import HeroSection from "@/components/home/HeroSection";
import WhoWeAre from "@/components/home/WhoWeAre";
import Services from "@/components/home/Services";
import Why from "@/components/home/Why";
import TeamBanner from "@/components/home/TeamBanner";
import Categories from "@/components/home/Categories";
import Partners from "@/components/home/Partners";
import Blogs from "@/components/home/Blogs";
import type { HomeData } from "@/types/homeTypes";

type HomePageProps = {
  data: HomeData | null;
};

export default function HomePage({ data }: HomePageProps) {
  if (!data) return null;

  return (
    <>
      <HeroSection />
      <WhoWeAre section={data.about_us} />
      <Services section={data.services_section} />
      <Why section={data.our_philosophy_section} />
      <TeamBanner section={data.our_team_section} />
      <Categories section={data.categories_section} />
      <Partners section={data.partners_section} />
      <Blogs section={data.blogs_section} />
    </>
  );
}
