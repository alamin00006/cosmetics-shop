import Banner from "@/components/header/Banner";
import CollectionCarousel from "@/components/Carousel/CollectionCarousel";
import TopPickCarousel from "@/components/Carousel/TopPickCarousel";

import NewArrivalsCarousel from "@/components/Carousel/NewArrivalsCarousel";
import SquareBanner from "@/components/Banner/SquareBanner";
import TrendsSection from "@/components/TrendsSection";
import BrandOfTheWeekCarousel from "@/components/Carousel/BrandOfTheWeekCarousel";
import BestSellerCarousel from "@/components/Carousel/BestSellerCarousel";
import RewardSquareBanner from "@/components/Carousel/RewardSquareBanner";


export default function Home() {
  return (
    <main>
      <div>
       <Banner/>
       <CollectionCarousel/>
        <TopPickCarousel/>
        <NewArrivalsCarousel/>
        <SquareBanner/>
        <TrendsSection/>
        <BrandOfTheWeekCarousel/>
        <BestSellerCarousel/>
        <RewardSquareBanner/>
      </div>
    </main>

  );
}