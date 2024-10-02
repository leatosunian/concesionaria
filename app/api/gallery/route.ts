import CarImageModel from "@/app/models/carimage";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { mkdir, writeFile } from "fs/promises";
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
      console.log("Carpeta creada:", dir);
    }

    for (const file of files) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const pathUuid = Math.random().toString().split(".")[1];
      const imagePath = path.join(
        process.cwd(),
        `uploads/carGallery/${pathUuid}${file.name}`
      );
      await writeFile(imagePath, buffer);
      console.log("File written to: ", imagePath);
      await CarImageModel.create({
        carID,
        path: `${pathUuid}${file.name}`,
        uuid: uuidv4(),
      });
    }

    return NextResponse.json({ msg: "FILES_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
