import Link from "next/link"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className="bg-white border-b ">
        <div className="app-container flex justify-between items-center h-16">
            <h2 className="font-bold text-xl">Smeal</h2>
            <div className="flex items-center gap-4">
                <Link href="#">Features</Link>
                <Link href="https://github.com/fisayo-dev/seo-analyzer" target="_blank">Github</Link>
                <Button>Get started</Button>
            </div>
        </div>
    </div>
  )
}

export default Header