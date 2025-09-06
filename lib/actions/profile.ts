"use server"

import { eq } from "drizzle-orm";
import { db } from "../db"
import { user } from "../db/schema"

export const updateProfileName = async (userId: string, newName: string) => {
    try {
        await db.update(user).set({ name: newName }).where(eq(user.id, userId));
    } catch(err) {
        throw new Error("An error occurred while trying to update profile name")
    }
}

export const deleteAccount = async (userId:string) => {
    try {
        await db.delete(user).where(eq(user.id, userId))
    } catch(err) {
        throw new Error("Failed to delete account")
    }
}