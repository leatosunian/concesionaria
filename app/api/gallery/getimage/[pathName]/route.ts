import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import CarImageModel from "@/app/models/carimage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { pathName: string } }
) {
  console.log(params.pathName); // 126799876127980.png
  const imagePath = path.join(
    process.cwd(),
    "public",
    "carGallery",
    params.pathName
  ); // Ruta completa del archivo
  try {
    const deleteOnDB = await CarImageModel.findOneAndDelete({
      path: params.pathName,
    });

    if (!deleteOnDB) {
      return NextResponse.json(
        { message: "Image not found in DB" },
        { status: 404 }
      );
    }

    // Luego, elimina el archivo del sistema de archivos
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Archivo eliminado: ${imagePath}`);
    } else {
      console.log(`El archivo no existe: ${imagePath}`);
      return NextResponse.json(
        { message: "File not found on server" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }

  return NextResponse.json({ msg: "DELETED" });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { pathName: string } }
) {
  try {
    const { pathName } = params;
    // Verificar la ruta completa donde se suben los archivos
    const filePath = path.join(
      process.cwd(),
      `uploads/carGallery/carGallery/${pathName}`
    );
    console.log("Buscando el archivo en:", filePath);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.log("Archivo no encontrado:", filePath);
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Definir tipo MIME basado en la extensión del archivo
    let contentType = "application/octet-stream";
    if (pathName.endsWith(".webp")) contentType = "image/webp";
    else if (pathName.endsWith(".jpg") || pathName.endsWith(".jpeg"))
      contentType = "image/jpeg";
    else if (pathName.endsWith(".png")) contentType = "image/png";

    const response = new NextResponse(fileBuffer);
    response.headers.set("Content-Type", contentType);

    return response;
  } catch (error) {
    console.log("Error al obtener el archivo:", error);
    return NextResponse.json(
      { message: "Error fetching file" },
      { status: 500 }
    );
  }
}
