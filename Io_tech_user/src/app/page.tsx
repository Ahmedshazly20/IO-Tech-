import HeroSection  from "@/components/layout/Hero";
import { TeamSection } from "@/components/layout/Ourteam";
import Image from "next/image";

export default function Home() {
  return (
       <div >
         <HeroSection/>
         <TeamSection/>
      </div>
  );
}
