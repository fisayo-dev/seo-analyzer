import { ReactNode } from "react"

export const metadata = {
    title: 'Login | Smeal',
    description: 'Login in to your smeal account.',
    keywords: ['login', 'authentication', 'secure', 'smeal', 'seo', 'analyze', 'user access'],
    authors: [{ name: 'Your Company Name' }],
    robots: 'noindex, nofollow',
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'utf-8',
} 
const layout = ({children}: {children:ReactNode}) => {

  return (
    <div>{children}</div>
  )
}

export default layout