import CarModel from "@/app/models/car";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// SAVE GALLERY IMAGES
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const carID = data.get("carID") as string;
    const files = data.getAll("gallery_images") as File[];

    if (files.length === 0) {
      return NextResponse.json({ msg: "NO_FILES_PROVIDED" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "uploads/carGallery"); 
    if (!fs.existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    for (const file of files) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const pathUuid = Math.random().toString().split(".")[1];
      const imagePath = path.join(
        process.cwd(),
        `uploads/carGallery/${pathUuid}${file.name}`
      );
      try {
        await writeFile(imagePath, buffer);
        console.log("File written to:", imagePath);
      } catch (writeError) {
        console.error("Error writing file:", writeError);
        return NextResponse.json(
          { msg: "ERROR_WRITING_FILE" },
          { status: 500 }
        );
      }
      const updatedCar = await CarModel.findOneAndUpdate(
        { uuid: carID },
        { imagePath: `${pathUuid}${file.name}` },
        { new: true }
      );
    }
    return NextResponse.json({ msg: "THUMBNAIL_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
