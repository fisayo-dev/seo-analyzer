

import { and, eq } from "drizzle-orm";
import { db } from "../db"
import { seo_analysis } from "../db/schema"
import { auth } from "../auth";
import { headers } from "next/headers";

const getSessionUserId = async () : Promise<string> => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) throw new Error("Unaunthenticated")

    return session.user.id;
}

export const fetchAnalysisDetails = async (url : string) => {
    const userId = await getSessionUserId()
    try {
        const analysis = await db
            .select()
            .from(seo_analysis)
            .where(and(eq(seo_analysis.userId, userId), eq(seo_analysis.url, url)))
            .limit(1);

        return analysis[0]

    } catch(error) {
        console.error(error)
    }
}

export const fetchUserAnalysis = async () => {
    const userId = await getSessionUserId()
    try {
        const analysis = await db
            .select()
            .from(seo_analysis)
            .where(eq(seo_analysis.userId, userId))
            .limit(1);

        return analysis

    } catch(error) {
        console.error(error)
    }
}