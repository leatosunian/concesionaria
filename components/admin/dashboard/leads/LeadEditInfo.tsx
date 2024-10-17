"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "@/app/schemas/editLeadForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICar } from "@/app/models/car";
import styles from "@/app/css-modules/dashboard/leads/newleadform.module.css";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { carBrands } from "@/app/utils/carBrands";
import { cn } from "@/lib/utils";

const LeadEditForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      contactType: "",
      businessType: "",
      address: "",
      observations: "",
      phone: "",

      leadName: "",
      leadYear: "",
      leadBrand: "",
      leadKilometers: "",
      leadMotor: "",
      leadType: "",
      leadCurrency: "ARS",
      leadPrice: "",
      leadModelName: "",
      leadGearbox: "",
      leadDoors: "",
      leadGas: "",
      leadDescription: "",
    },
  });
  const router = useRouter();

  const [vehicleList, setVehicleList] = useState<ICar[]>([]);
  const [open, setOpen] = useState(false);
  const [createdVehicle, setCreatedVehicle] = useState<ICar>();
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedIntIn, setSelectedIntIn] = useState<ICar>();
  const handleClick = () => {
    modalButtonRef.current?.click();
  };
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("search");

  async function getCars(searchParam: string) {
    try {
      const url =
        searchFilter && searchFilter !== "null"
          ? `/api/cars/?search=${searchParam}`
          : `/api/cars/`;
      const carsFetch = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleList(cars);
      return cars;
    } catch (error) {
      return;
    }
  }

  // ADD NEW PRODUCT FUNCTION
  async function onSubmit(values: any) {
    try {
      const vehicle = await fetch("/api/cars", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((response) => response.json());
      console.log(vehicle);

      if (vehicle) {
        setCreatedVehicle(vehicle);

        handleClick();
      }
    } catch (error) {
      // error alert
    }
  }

  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery === null) {
      return setVehicleList([]);
    }
    if (searchQuery) getCars(searchQuery);
  }, [searchParams]);

  useEffect(() => {
    console.log(vehicleList);
  }, [vehicleList]);

  return (
    <>
      <Form {...form}>
        <span className="text-xl font-semibold">Datos personales</span>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 mt-6 md:gap-10 md:grid-cols-2">
            {/* left column */}
            <div className="grid grid-cols-1 gap-4 h-fit md:gap-8 md:grid-cols-2">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Nombre </FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* surname */}
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Perez" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* contacttype */}
              <FormField
                control={form.control}
                name="contactType"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Origen del lead</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="whatsapp">
                          Whatsapp entrante
                        </SelectItem>
                        <SelectItem value="mercadoLibre">
                          Mercado Libre
                        </SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="facebook">Instagram</SelectItem>
                        <SelectItem value="call">Llamada</SelectItem>
                        <SelectItem value="referido">Referido</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* businesstype */}
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Tipo de negocio</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="usedForUsed">Usado por usado</SelectItem>
                        <SelectItem value="buyUsed">Compra de usado</SelectItem>
                        <SelectItem value="0km">0km</SelectItem>
                        <SelectItem value="planAhorro">Plan de ahorro</SelectItem>
                        <SelectItem value="posventa">Posventa</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* observations */}
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Observaciones <span className="">(opcional)</span>
                    </FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Ingresa tus observaciones"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* right column */}
            <div className="grid grid-cols-1 gap-4 h-fit md:gap-8 md:grid-cols-2">
              {/* phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="2235405608" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Juan B. Justo 4050"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* city */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mar del Plata"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* state */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Buenos Aires"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* date of cration */}
              {/* <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="juanperez@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* asign seller */}
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Asignar vendedor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CAR">Yo</SelectItem>
                        <SelectItem value="s">Agustín Lopez</SelectItem>
                        <SelectItem value="g">Juan Perez</SelectItem>
                        <SelectItem value="BIKE">Ramiro Gomez</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* observations */}
          {/* <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem className="w-full pr-0 mt-4 md:mt-8 md:w-1/2 md:pr-5 ">
                <FormLabel>
                  Observaciones <span className="">(opcional)</span>
                </FormLabel>
                <Textarea {...field} placeholder="Ingresa una descripción" />
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* interested in section */}
          <Separator className="my-10" />
          <span className="text-xl font-semibold">Vehiculo de interés</span>
          <div className="flex flex-col items-center justify-center gap-5 mt-8">
            {vehicleList.length === 0 && (
              <h4 className="text-base font-medium">
                Buscá y seleccioná un vehículo
              </h4>
            )}
            <div className={`w-full md:w-1/3 ${styles.group}`}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={styles.searchicon}
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>

              <input
                id="query"
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.input}
                defaultValue={searchParams.get("search")?.toString()}
                type="search"
                placeholder="Search..."
                name="searchbar"
              />
            </div>

            <div className="grid grid-cols-1 gap-10 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {vehicleList?.map((car) => (
                <div key={car.uuid} className="col-span-1 md:h-full h-fit">
                  <Card
                    key={car.uuid}
                    className="flex flex-col h-full shadow-lg"
                  >
                    <Image
                      src={`/api/gallery/getimage/${car.imagePath}`}
                      alt=""
                      width={500}
                      height={500}
                      className="object-cover h-full mb-4 overflow-hidden md:h-1/2 rounded-t-md "
                    />
                    <div className="flex flex-col justify-between w-full h-fit md:h-1/2">
                      <CardHeader style={{ padding: "0 16px 10px 16px" }}>
                        <CardTitle className="text-base textCut">
                          {car.name}
                        </CardTitle>
                        <CardDescription className="flex items-center justify-between w-full pt-1 pb-2 ">
                          <div className="flex items-center gap-2">
                            <FaRegCalendar /> <span>{car.year}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IoSpeedometerOutline size={20} />
                            <span> {car.kilometers} km</span>
                          </div>
                        </CardDescription>
                        <p className="text-lg font-semibold">
                          {car.currency} ${car.price}
                        </p>
                      </CardHeader>
                      <CardFooter className="w-full">
                        <Button
                          onClick={() => setSelectedIntIn(car)}
                          variant={"default"}
                          className="w-full mt-2 md:mt-0"
                        >
                          Asignar vehículo
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* interested in section */}
          <Separator className="my-10" />
          <span className="text-xl font-semibold">
            Vehiculo del lead{" "}
            <span className="text-base font-normal text-gray-500">
              (opcional)
            </span>
          </span>
          <div className="">
            <div className="grid grid-cols-1 gap-4 mt-6 md:gap-10 md:grid-cols-2">
              {/* product name */}
              <div className="flex flex-col gap-4 md:gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del vehiculo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Chevrolet Cruze LTZ 1.4T"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex col-span-2 gap-2">
                  <FormField
                    control={form.control}
                    name="leadCurrency"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <FormLabel>Precio</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ARS">ARS</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leadPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="opacity-0">-</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa un precio"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* year and brand */}
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="leadBrand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="justify-between w-full"
                            >
                              {field.value
                                ? carBrands.find(
                                    (brand) => brand === field.value
                                  )
                                : "Seleccionar"}
                              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Buscar marca..." />
                            <CommandList>
                              <CommandEmpty>No hay resultados.</CommandEmpty>
                              <CommandGroup>
                                {carBrands.map((brand) => (
                                  <CommandItem
                                    key={brand}
                                    value={brand}
                                    className="capitalize"
                                    onSelect={() => {
                                      console.log(brand);
                                      setOpen(false);
                                      form.setValue("leadBrand", brand);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === brand
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {brand}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leadModelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Cruze" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leadType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de vehículo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        //defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CAR">Automóvil</SelectItem>
                          <SelectItem value="BIKE">Motocicleta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leadYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año de fabricación</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. 2021"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* modelname and kilometers */}
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="leadKilometers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kilómetros</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa un kilometraje"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadDoors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad de puertas</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        //defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2P">2 puertas</SelectItem>
                          <SelectItem value="3P">3 puertas</SelectItem>
                          <SelectItem value="4P">4 puertas</SelectItem>
                          <SelectItem value="5P">5 puertas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="leadDescription"
              render={({ field }) => (
                <FormItem className="w-full pr-0 mt-4 md:mt-8 md:w-1/2 md:pr-5 ">
                  <FormLabel>
                    Descripción <span className="">(opcional)</span>
                  </FormLabel>
                  <Textarea {...field} placeholder="Ingresa una descripción" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-10" />
            <span className="text-lg font-semibold">Motorización</span>
            <div className="grid grid-cols-1 gap-4 mt-4 md:gap-10 md:grid-cols-2">
              {/* motor and gearbox */}
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="leadMotor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. 2.0 TSI"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadGearbox"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transmisión</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        //defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MANUAL">Manual</SelectItem>
                          <SelectItem value="AUTOMATIC">Automática</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="leadGas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combustible</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NAFTA">Nafta</SelectItem>
                          <SelectItem value="DIESEL">Diesel</SelectItem>
                          <SelectItem value="GNC">GNC</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-12 mb-5 md:w-1/3">
            Crear lead
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LeadEditForm;
