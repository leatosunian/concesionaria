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
import React from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVehicles, setCurrentVehicles] = useState<ICar[]>([]);

  const [vehiclesPerPage, setVehiclesPerPage] = useState<number>(12);
  const lastVehicleIndex = currentPage * vehiclesPerPage;
  const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);

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

  function handlePrevAndNextPage(to: string) {
    if (to === "PREV") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
      return;
    }
    if (to === "NEXT") {
      if (numberOfPages.length === currentPage) return;
      setCurrentPage(currentPage + 1);
      return;
    }
  }

  useEffect(() => {
    const currentVehicles = carList.slice(firstVehicleIndex, lastVehicleIndex);
    setCurrentVehicles(currentVehicles);

    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(carList.length / vehiclesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
    console.log("vehiclelist", carList);

    console.log("numberOfPages", currentPage);
    console.log("numberOfPages", numberOfPages);
  }, [carList, currentPage]);

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      {currentVehicles.length === 0 && (
        <>
          <div className="flex flex-col items-center justify-center w-full gap-5 py-36 h-fit">
            <h4 className="text-base font-semibold md:text-2xl">
              Todavía no tenés vehículos en tu stock.
            </h4>
            <Link href={"/admin/dashboard/stock/add"}>
              <Button>Agregar vehículo</Button>
            </Link>
          </div>
        </>
      )}
      {currentVehicles.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {currentVehicles?.map((car) => (
              <div key={car.uuid} className="col-span-1 md:h-full h-fit">
                <Card key={car.uuid} className="flex flex-col h-full shadow-lg">
                  <Image
                    src={`/carGallery/${car.imagePath}`}
                    alt=""
                    width={500}
                    height={500}
                    className="object-cover h-full mb-4 overflow-hidden md:h-1/2 rounded-t-md "
                  />
                  <CardHeader style={{ padding: "0 16px 16px 16px" }}>
                    <CardTitle className="text-lg textCut">
                      {car.name}
                    </CardTitle>
                    <p>
                      {car.currency} ${car.price}
                    </p>
                    <CardDescription>
                      {car.year} - {car.kilometers} km
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="grid grid-cols-2 gap-3 px-4 ">
                    <Button
                      onClick={() => handleEdit(car.uuid)}
                      variant={"default"}
                    >
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
              </div>
            ))}
          </div>
          <div className="px-10 rounded-md">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="sr-only"
                  ref={modalButtonRef}
                  variant="outline"
                >
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

          {/* pagination */}
          <div className="mt-10 md:mt-20">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePrevAndNextPage("PREV")}
                  />
                </PaginationItem>
                {numberOfPages.map((page) => (
                  <>
                    <PaginationItem
                      onClick={() => {
                        console.log("setcurrentpage to ", page);
                        setCurrentPage(page);
                      }}
                    >
                      <PaginationLink isActive={currentPage === page} href="#">
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePrevAndNextPage("NEXT")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default CarList;
