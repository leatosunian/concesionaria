"use client";

import { ICar } from "@/app/models/car";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import carImg from "@/public/car.jpg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CarList = ({ cars }: { cars: ICar[] }) => {
  const [carList, setCarList] = useState<ICar[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState({
    uuid: "",
    carName: "",
  });
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    modalButtonRef.current?.click();
  };

  const router = useRouter();
  useEffect(() => {
    if (cars) {
      setCarList(cars);
    }
  }, [cars]);

  const { data: session, status } = useSession();
  console.log(session, status);

  async function handleEdit(uuid: string) {
    router.push("/admin/dashboard/stock/" + uuid);
  }

  async function handleDelete(uuid: string) {
    console.log(uuid);

    try {
      const vehicle = await fetch("/api/cars/" + uuid, {
        method: "DELETE",
      }).then((response) => response.json());
      console.log("vehicle:", vehicle);
      if (vehicle.msg === "CAR_DELETED") {
        console.log("car deleted");
        setCarList((prevCars) => {
          const updatedCars = prevCars?.filter((car) => car.uuid !== uuid);
          console.log("updatedCars:", updatedCars);
          return updatedCars;
        });
      }
      router.refresh();
    } catch (error) {
      // error alert
    }
  }

  function openDeleteModal({
    carName,
    uuid,
  }: {
    carName: string;
    uuid: string;
  }) {
    setSelectedToDelete({ carName, uuid });
    handleClick();
  }

  function handleDeleteConfirmed(uuid: string) {
    handleDelete(uuid);
  }

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      {carList?.map((car) => (
        <Card key={car.uuid}>
          <Image
            src={`/carGallery/${car.imagePath}`}
            alt=""
            width={500}
            height={500}
            className="object-cover mb-4 overflow-hidden rounded-t-md "
          />
          <CardHeader style={{ padding: "0 16px 16px 16px" }}>
            <CardTitle className="text-lg">{car.name}</CardTitle>
            <p>
              {car.currency} ${car.price}
            </p>
            <CardDescription>
              {car.year} - {car.kilometers} km
            </CardDescription>
          </CardHeader>
          <CardFooter className="grid grid-cols-2 gap-3 px-4 ">
            <Button onClick={() => handleEdit(car.uuid)} variant={"default"}>
              Editar
            </Button>
            <Button
              //onClick={() => handleDelete(car.uuid)}
              onClick={() =>
                openDeleteModal({ carName: car.name, uuid: car.uuid })
              }
              variant={"destructive"}
            >
              Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="px-10 rounded-md">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="sr-only" ref={modalButtonRef} variant="outline">
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar vehículo</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Querés eliminar tu vehiculo {selectedToDelete.carName}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteConfirmed(selectedToDelete.uuid)}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default CarList;
