import { NextResponse } from "next/server";

import { promises as fs } from "node:fs";

export async function GET() {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/data/product.json",
      "utf8"
    );
    const data = JSON.parse(file);

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
