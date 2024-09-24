import { Separator } from "@/components/ui/separator";
import AddProductForm from "@/components/admin/dashboard/addProduct/AddProductForm";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

const AddProduct = () => {
  return (
    <>
      <h2 className="text-2xl font-medium ">Agregar auto</h2>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* EDIT PRODUCT FORM */}
          <AddProductForm />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
