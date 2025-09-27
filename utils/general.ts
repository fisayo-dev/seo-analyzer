export const getInitials = (name: string | undefined) => {
    if (!name) return ""
    const words = name.trim().split(" ")
    const firstTwo = words.slice(0, 2).map(word => word.charAt(0).toUpperCase())
    return firstTwo.join("")
}