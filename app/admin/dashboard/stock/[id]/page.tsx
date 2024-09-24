"use client";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "@/components/admin/dashboard/editProduct/ImageGallery";
import EditProductForm from "@/components/admin/dashboard/editProduct/EditProductForm";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

const EditProduct = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <h2 className="text-2xl font-medium ">Editar vehículo</h2>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* EDIT PRODUCT FORM */}
          <EditProductForm uuid={params.id} />

          <div className="block md:hidden">
            <Separator className="my-10 " />

            {/* CAROUSEL CONTAINTER */}
            {/* pass gallery images as props */}
            <ImageGallery />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
