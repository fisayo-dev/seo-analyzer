import { ReactNode } from "react"

export const metadata = {
    title: 'Login | Scanzie',
    description: 'Login in to your Scanzie account.',
    keywords: ['login', 'authentication', 'secure', 'Scanzie', 'seo', 'analyze', 'user access'],
    robots: 'noindex, nofollow',
    charset: 'utf-8',
} 
const layout = ({children}: {children:ReactNode}) => {

  return (
    <div>{children}</div>
  )
}

export default layout