"use server"

import { db } from "../db"
import { user } from "../db/schema"


export const updateProfileName = async (userId: number, newName: string) => {
    try {
        await db.update(user).set({ name: newName }).where({ id: userId });
    } catch(err) {
        throw new Error("An error occurred while trying to update profile name")
    }
}