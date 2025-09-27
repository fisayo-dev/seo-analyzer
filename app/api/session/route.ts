import { NextRequest } from "next/server";
import { auth } from "@/utils/auth"; // Adjust the import path to your auth configuration

export async function GET(request: NextRequest) {
  try {
    // Get the session from better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Return the session data
    return Response.json({
      success: true,
      session: session,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    
    return Response.json(
      {
        success: false,
        error: "Failed to fetch session",
        session: null,
      },
      { status: 500 }
    );
  }
}