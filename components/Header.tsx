import Link from "next/link"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className="bg-background border-b border-white/50 fixed w-full top-0 left-0 z-50">
        <div className="app-container flex justify-between items-center h-[72px]">
            <h2 className="font-bold text-xl">Smeal</h2>
            <div className="flex items-center gap-4">
                <Link href="https://github.com/fisayo-dev/seo-analyzer" target="_blank">Github</Link>
                <Link href="/login">
                  <Button>Get started</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header