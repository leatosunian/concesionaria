"use client";
import Header from "@/components/page/Header";
import Breadcrumbs from "@/components/page/home/vehicles/vehicle/Breadcrumbs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import car from "@/public/car.jpg";
import styles from "@/app/css-modules/vehicles/vehicle/vehicle.module.css";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { PiGasPump } from "react-icons/pi";
import Footer from "@/components/page/home/Footer";
import NewProducts from "@/components/page/home/NewProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ICar } from "@/app/models/car";
import { ICarImage } from "@/app/models/carimage";
import { useParams } from "next/navigation";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import RelatedVehicles from "@/components/page/home/vehicles/vehicle/RelatedVehicles";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";

const Page = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [vehicleData, setVehicleData] = useState<ICar>();
  const [gallery, setGallery] = useState<ICarImage[]>([]);
  const [latestVehicles, setLatestVehicles] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { uuid } = useParams();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  async function getLastVehicles() {
    const latestVehicles = await fetch("/api/cars/latests", {
      method: "GET",
      cache: "no-cache",
    }).then((response) => response.json());
    if (latestVehicles.length !== 0) {
      setLatestVehicles(latestVehicles);
    }
    return latestVehicles;
  }

  useEffect(() => {
    getLastVehicles();
    //fetch 10 lastest vehicles
  }, []);

  useEffect(() => {
    console.log(current);
  }, [current]);

  async function getCarData(uuid: string) {
    try {
      // get vehicle data
      const carsFetch = await fetch(`http://localhost:3000/api/cars/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      console.log(cars);
      setVehicleData(cars);
      console.log(uuid);
      // get vehicle gallery
      const galleryFetch = await fetch(
        `http://localhost:3000/api/gallery/${uuid}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const gallery = await galleryFetch.json();
      setGallery(gallery);
      setLoading(false);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getCarData(uuid as string);
  }, [uuid]);

  return (
    <>
      {loading && <LoaderFullscreen />}
      <Header />
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-20"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 py-6 md:px-24 2xl:px-64 h-fit">
        <Breadcrumbs name={vehicleData?.name} />
      </div>

      <div className="w-full px-6 py-0 md:py-2 md:px-24 2xl:px-64 h-fit">
        <div className="flex flex-col gap-6 md:flex-row md:gap-20">
          {/* carousel */}
          <div className="relative w-full md:w-3/5 aspect-square ">
            {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
            <div className="relative">
              {/* Carousel */}
              <Carousel
                setApi={setApi}
                className="relative w-full overflow-hidden rounded-lg aspect-square "
                onMouseEnter={plugin.current.stop}
                plugins={[plugin.current as any]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {gallery.map((image) => (
                    <CarouselItem
                      key={image.uuid}
                      className="w-full h-full overflow-hidden rounded-md "
                    >
                      <Image
                        src={`/carGallery/${image.path}`}
                        alt={`Imagen `}
                        width={500}
                        objectFit="cover"
                        height={500}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Custom Indicators */}
              <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
                {gallery.map((dot, index) => (
                  <button
                    key={dot.uuid}
                    className={`w-2 h-2 rounded-full ${
                      index + 1 === current ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* vehicle details */}
          <div className="w-full md:w-2/3">
            {/* title, price and description */}
            <div className="flex flex-col gap-4">
              <h4 className="text-2xl font-semibold md:text-3xl">
                {vehicleData?.name}
              </h4>

              {/* vehicle data */}
              <div className="flex flex-wrap gap-5 mt-2 md:mt-0">
                <div className="flex items-center gap-2 w-fit h-fit">
                  <IoSpeedometerOutline size={25} />
                  <span className="text-sm font-medium">
                    {vehicleData?.kilometers} km
                  </span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <MdOutlineCalendarMonth size={25} />
                  <span className="text-sm font-medium">
                    {vehicleData?.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <GiGearStickPattern size={25} />
                  {vehicleData?.gearbox === "AUTOMATIC" && (
                    <span className="text-sm font-medium">Automático</span>
                  )}
                  {vehicleData?.gearbox === "MANUAL" && (
                    <span className="text-sm font-medium">Manual</span>
                  )}
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <PiGasPump size={25} />

                  {vehicleData?.gas === "NAFTA" && (
                    <span className="text-sm font-medium">Nafta</span>
                  )}
                  {vehicleData?.gas === "GNC" && (
                    <span className="text-sm font-medium">GNC</span>
                  )}
                  {vehicleData?.gas === "DIESEL" && (
                    <span className="text-sm font-medium">Diésel</span>
                  )}
                </div>
              </div>
              <div className="w-full h-fit">
                <pre
                  style={{ font: "inherit", textWrap: "wrap" }}
                  className="w-full mt-3 mb-2 text-xs text-gray-500 md:mt-0"
                >
                  {vehicleData?.description}
                </pre>
              </div>
              <span className="mb-3 text-2xl font-semibold md:mb-2">
                {vehicleData?.currency} ${vehicleData?.price}{" "}
              </span>
              <button className={styles.button}>
                Consultar por el vehículo
              </button>
            </div>
          </div>
        </div>
      </div>

      <RelatedVehicles vehicles={latestVehicles} />

      <Footer />
    </>
  );
};

export default Page;
