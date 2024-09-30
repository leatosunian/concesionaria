import CarModel from "@/app/models/car";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// SAVE GALLERY IMAGES
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log(data);

    const carID = data.get("carID") as string;
    console.log(carID);
    const files = data.getAll("gallery_images") as File[];

    if (files.length === 0) {
      return NextResponse.json({ msg: "NO_FILES_PROVIDED" }, { status: 400 });
    }

    for (const file of files) {
      const buffer = new Uint8Array(await file.arrayBuffer());

      const pathUuid = Math.random().toString().split(".")[1];

      const imagePath = path.join(
        process.cwd(),
        `public/carGallery/${pathUuid}${file.name}`
      );

      await writeFile(imagePath, buffer);
      console.log(carID);
      console.log(`${pathUuid}${file.name}`);
      const updatedCar = await CarModel.findOneAndUpdate(
        { uuid: carID },
        { imagePath: `${pathUuid}${file.name}` },
        { new: true }
      );
      console.log(updatedCar);
    }

    return NextResponse.json({ msg: "THUMBNAIL_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
