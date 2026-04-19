import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Define the path where JSON will be saved
    const dataDir = join(process.cwd(), "public", "data");
    const filePath = join(dataDir, "api-responses.json");

    // Create directory if it doesn't exist
    try {
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }
    } catch (dirError) {
      console.error("Error creating directory:", dirError);
    }

    let allData: any[] = [];

    // Try to read existing data
    try {
      if (existsSync(filePath)) {
        const existingData = await readFile(filePath, "utf-8");
        allData = JSON.parse(existingData);
      }
    } catch (readError) {
      console.error("Error reading file:", readError);
      allData = [];
    }

    // Add new data with timestamp
    const newEntry = {
      timestamp: new Date().toISOString(),
      ...body,
    };

    allData.push(newEntry);

    // Write updated data back to file
    await writeFile(filePath, JSON.stringify(allData, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "Data saved successfully",
        filePath: filePath,
        totalEntries: allData.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
