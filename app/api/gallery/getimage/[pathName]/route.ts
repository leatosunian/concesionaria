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
  request: NextRequest,
  { params }: { params: { pathName: string } }
) {
  const { pathName } = params;

  // Ruta de la carpeta donde se almacenan las imágenes
  const imagesDir = path.join(process.cwd(), "public", "carGallery");

  // Busca el archivo de imagen correspondiente al UUID
  const imageFile = findImageByPathName(pathName, imagesDir);

  if (imageFile) {
    // Lee el archivo de imagen
    const imagePath = path.join(imagesDir, imageFile);
    const imageBuffer = fs.readFileSync(imagePath);

    // Establece las cabeceras adecuadas y envía la imagen como respuesta
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": '"image/jpeg", "image/png", "image/webp", "image/jpg"', // Ajusta el tipo MIME según el formato de la imagen
      },
    });
  } else {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }
}

// Función para buscar el archivo de imagen por pathName
function findImageByPathName(
  pathName: string,
  dir: string
): string | undefined {
  const files = fs.readdirSync(dir);
  return files.find((file) => file.includes(pathName));
}
