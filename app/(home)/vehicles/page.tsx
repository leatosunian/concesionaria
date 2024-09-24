"use client";
import { carBrands } from "@/app/utils/carBrands";
import { carYears } from "@/app/utils/carYears";
import Header from "@/components/page/Header";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/page/home/vehicles/Breadcrumbs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "@/app/css-modules/vehicles/vehicles.module.css";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import car from "@/public/car.jpg";
import Image from "next/image";
import Footer from "@/components/page/home/Footer";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { ICar } from "@/app/models/car";
import { useRouter } from "next/navigation";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [transmisionFilter, setTransmisionFilter] = useState("");
  const [doorsFilter, setDoorsFilter] = useState("");
  const [vehicleList, setVehicleList] = useState<ICar[]>([]);
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  async function getCars() {
    try {
      const carsFetch = await fetch("http://localhost:3000/api/cars", {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleList(cars);
      setLoading(false);
    } catch (error) {
      return;
    }
  }

  function sortVehicles(
    sortBy: "price-asc" | "price-desc" | "date-asc" | "date-desc"
  ): ICar[] {
    return vehicleList.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-asc":
          return a.createdAt!.getTime() - b.createdAt!.getTime();
        case "date-desc":
          return b.createdAt!.getTime() - a.createdAt!.getTime();
        default:
          return 0;
      }
    });
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      {loading && <LoaderFullscreen />}
      <Header />
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-20"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 py-2 md:px-24 2xl:px-48 h-fit">
        <Breadcrumbs />
      </div>

      {/* container for padding */}
      <div className="px-6 md:px-24 2xl:px-48 ">
        {/*  title and sort by */}
        <div className="flex flex-col justify-between w-full gap-2 mt-0 md:mt-2 md:flex-row h-fit ">
          <div className="flex flex-col w-fit">
            <h4 className="text-2xl font-medium md:text-3xl">
              Todos los vehículos
            </h4>
            <span className="mb-2 text-sm text-gray-400">
              Mostrando 1-12 de 56 vehículos
            </span>
          </div>

          {/* sort by  */}
          <div className="hidden my-auto w-fit h-fit md:block">
            <div className="hidden ml-auto w-fit h-fit md:block">
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      onClick={() => setVehicleList(sortVehicles("price-desc"))}
                      value="apple"
                    >
                      Mayor a menor precio
                    </SelectItem>
                    <SelectItem
                      onClick={() => setVehicleList(sortVehicles("price-asc"))}
                      value="banana"
                    >
                      Menor a mayor precio
                    </SelectItem>
                    <SelectItem value="blueberry">
                      Mas recientes a mas antiguos
                    </SelectItem>
                    <SelectItem value="grapes">
                      Mas antiguos a mas recientes
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* mobile sort by */}
          <div className="block md:hidden ">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Mayor a menor precio</SelectItem>
                  <SelectItem value="banana">Menor a mayor precio</SelectItem>
                  <SelectItem value="blueberry">
                    Mas recientes a mas antiguos
                  </SelectItem>
                  <SelectItem value="grapes">
                    Mas antiguos a mas recientes
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* VEHICLE LIST */}
        <div className="flex mt-4 md:mt-7">
          {/* FILTERS SIDEBAR */}
          <div
            style={{ border: "1px solid #0000001c" }}
            className="flex-col hidden w-1/4 p-5 rounded-md shadow-lg h-fit lg:flex"
          >
            <div className="">
              <span className="text-lg font-semibold">Filtros</span>
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0000001c",
                margin: "15px 0",
              }}
            ></div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Tipo de vehículo</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="CAR">Automóvil </SelectItem>
                      <SelectItem value="BIKE">Motocicleta</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Marca</span>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-full"
                    >
                      {brandFilter
                        ? carBrands.find((brand) => brand === brandFilter)
                        : "Seleccionar marca..."}

                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search brand..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No hay resultados.</CommandEmpty>
                        <CommandGroup>
                          {carBrands.map((brand) => (
                            <CommandItem
                              key={brand}
                              value={brandFilter}
                              onSelect={() => {
                                setBrandFilter(brand);
                                setOpen(false);
                              }}
                            >
                              {brand}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  brandFilter === brand
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Cantidad de puertas</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar cantidad..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2P">2 puertas</SelectItem>
                      <SelectItem value="3P">3 puertas</SelectItem>
                      <SelectItem value="4P">4 puertas</SelectItem>
                      <SelectItem value="5P">5 puertas</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Año</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar año..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {carYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Transmisión</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar transm..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MANUAL">Manual </SelectItem>
                      <SelectItem value="AUTOMATIC">Automática</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* VEHICLES */}

          <div className="w-full mb-24 md:mb-32">
            <div
              className={`${styles.vehiclesCont} xl:gap-10 gap-5 2xl:gap-12 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 py-5 md:py-0 pl-0 lg:pl-10   `}
            >
              {vehicleList.map((car) => (
                <>
                  <div className="h-full col-span-1">
                    <Card className="flex flex-col h-full shadow-lg">
                      {" "}
                      {/* Añadir flex y flex-col */}
                      <Image
                        src={`/carGallery/${car.imagePath}`}
                        alt="auto"
                        width={500}
                        height={500}
                        className="object-cover mb-4 overflow-hidden rounded-t-md"
                      />
                      <CardHeader style={{ padding: "0 16px 16px 16px" }}>
                        <CardTitle className="text-base">{car.name}</CardTitle>
                        <CardDescription>
                          {car.year} - {car.kilometers} km
                        </CardDescription>
                        <p className="text-lg font-semibold">
                          {car.currency} ${car.price}{" "}
                        </p>
                      </CardHeader>
                      <CardFooter className="px-4 mt-auto">
                        {" "}
                        {/* mt-auto para mantener el botón abajo */}
                        <Button
                          onClick={() => {
                            router.push(`/vehicles/${car.uuid}`);
                          }}
                          variant={"default"}
                          className="w-full"
                        >
                          Ver más
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </>
              ))}
            </div>

            {/* pagination */}
            <div className="mt-10 md:mt-20">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive href="#">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
