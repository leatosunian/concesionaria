import { Document, model, Schema, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ICarImage extends Document {
  carID: string;
  path: string;
  uuid: string;
}

const carImageSchema: Schema = new Schema<ICarImage>(
  {
    carID: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CarImageModel = models.car_images || model("car_images", carImageSchema);

export default CarImageModel;
