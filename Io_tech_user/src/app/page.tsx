import Footer from "@/components/layout/Footer";
import HeroSection  from "@/components/layout/Hero";
import { TeamSection } from "@/components/layout/Ourteam";
import Testimonials from "@/components/layout/TestimonialSection";

export default function Home() {
  return (
       <div >
         <HeroSection/>
         <TeamSection/>
         <Testimonials/>
         <Footer/>
        
      </div>
  );
}
