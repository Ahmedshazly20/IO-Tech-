import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/layout/Hero"

export default function Legalservices({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
     
        <HeroSection/>
        <main>{children}</main>
        <Footer/>
      
    </>
  )
}