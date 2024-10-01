import CarModel from "@/app/models/car";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// SAVE GALLERY IMAGES
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log(data);

    const carID = data.get("carID") as string;
    console.log(carID);
    const files = data.getAll("gallery_images") as File[];
    console.log("files", files);

    if (files.length === 0) {
      return NextResponse.json({ msg: "NO_FILES_PROVIDED" }, { status: 400 });
    }

    // Definir el directorio
    const dir = path.join(process.cwd(), "uploads/carGallery"); // Asegúrate de usar una ruta correcta y accesible

    // Crear la carpeta si no existe
    if (!fs.existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log("Carpeta creada:", dir);
    }

    for (const file of files) {
      console.log("file", file);

      const buffer = new Uint8Array(await file.arrayBuffer());

      const pathUuid = Math.random().toString().split(".")[1];

      const imagePath = path.join(
        process.cwd(),
        `uploads/carGallery/${pathUuid}${file.name}`
      );
      console.log("imagepath", imagePath);

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
      console.log("File written to: ", imagePath);
      const updatedCar = await CarModel.findOneAndUpdate(
        { uuid: carID },
        { imagePath: `${pathUuid}${file.name}` },
        { new: true }
      );
      console.log("MINIATURA DE VEHICULO ACTUALIZADO", updatedCar.imagePath);
    }

    return NextResponse.json({ msg: "THUMBNAIL_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
