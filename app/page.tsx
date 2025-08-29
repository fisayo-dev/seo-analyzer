import FeaturesSection from "@/components/Features";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-14">
        <Hero />
        <FeaturesSection />
      </div>
    </div>
  );
}
