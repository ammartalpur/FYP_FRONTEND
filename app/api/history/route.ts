import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "clear-all") {
      const filePath = join(process.cwd(), "public", "data", "api-responses.json");
      await writeFile(filePath, JSON.stringify([], null, 2), "utf-8");

      return NextResponse.json(
        { success: true, message: "All history cleared" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error handling delete request:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
