import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const Hero = () => {
  return (
   <div className="custom-hero-background">
        <div className="flex flex-col h-[90vh] place-content-center gap-6 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold">Analyze your website <br/> SEO and performance.</h2>
            <p className="text-xl text-white/80">Boost your site&apos;s ranking and speed with our powerful analytics tools.</p>
            <div className="flex justify-center my-2 gap-4">
                <Link href="/login">
                    <Button className="hover:scale-110 font-semibold p-6 hover:bg-blue-700 transition duration-300">
                        <span>Get Started now</span>
                        <ArrowRight />
                    </Button>
                </Link>
                <Button className="hover:scale-110 bg-gray-200 p-6 text-gray-800 font-semibold hover:bg-gray-300 transition duration-300">
                    <span>Check Features</span>
                    <ArrowDown />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Hero