import { Button } from "./ui/button"

const Hero = () => {
  return (
   <div className="bg-white">
        <div className="flex flex-col h-[90vh] place-content-center gap-4 text-center">
            <h2 className="text-6xl font-extrabold">Analyze your website <br/> SEO and performance.</h2>
            <p className="text-xl text-gray-600">Boost your site&apos;s ranking and speed with our powerful analytics tools.</p>
            <div className="flex justify-center gap-4">
                <Button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </Button>
                <Button className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition">
                    Check Features
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Hero