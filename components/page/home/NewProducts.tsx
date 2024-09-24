"use client";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import stylesSearch from "@/app/css-modules/home.search.module.css";
import { Button } from "@/components/ui/button";
import { ICar } from "@/app/models/car";
import EmblaCarousel, { EmblaPluginType } from "embla-carousel";
import { motion } from "framer-motion";

interface Props {
  vehicles: ICar[];
}

const NewProducts = ({ vehicles }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [latestVehicles, setLatestVehicles] = useState<ICar[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setLatestVehicles(vehicles);
  }, [vehicles]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <>
      <section className="flex flex-col justify-center w-full gap-10 py-20 align-middle">
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center mx-auto overflow-hidden md:hidden"
        >
          <h4 className="text-xl font-bold sm:text-2xl">Últimos ingresos</h4>
          <span className="text-sm text-gray-500 sm:text-base">
            Estas son nuestras unidades mas recientes
          </span>
        </motion.header>
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex-row items-start justify-between hidden w-full px-6 mx-auto md:flex md:max-w-6xl "
        >
          <div className="flex flex-col ">
            <span className="text-sm font-bold text-red-500 upper sm:text-base">
              Últimos ingresos
            </span>
            <h4 className="text-xl font-bold sm:text-3xl">
              Estas son nuestras unidades mas recientes
            </h4>
          </div>
          <div className="flex justify-center mt-4 w-fit h-fit">
            <button className={`${stylesSearch.button}`}>
              Ver todos los vehículos
            </button>{" "}
          </div>
        </motion.header>
        <div className="w-full mx-auto overflow-hidden">
          <motion.div
            className=""
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: "some", once: true }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
          >
            <Carousel
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setApi}
              plugins={[plugin.current as any]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mx-auto md:max-w-6xl"
            >
              <CarouselContent className="w-full mx-auto h-fit sm:pl-0">
                {latestVehicles.map((car) => (
                  <CarouselItem
                    key={car.uuid}
                    className="px-5 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="h-full p-1">
                      <Card className="flex flex-col h-full shadow-lg">
                        {" "}
                        {/* Añadir flex y flex-col */}
                        <Image
                          src={`/carGallery/${car.imagePath}`}
                          alt="auto"
                          width={500}
                          height={500}
                          className="object-cover mb-4 overflow-hidden rounded-t-md h-1/2"
                        />
                        <CardHeader style={{ padding: "0 16px 16px 16px" }}>
                          <CardTitle className="text-lg">{car.name}</CardTitle>
                          <CardDescription>
                            {car.year} - {car.kilometers} km
                          </CardDescription>
                          <p className="text-lg font-semibold">
                            {car.currency} ${car.price}
                          </p>
                        </CardHeader>
                        <CardFooter className="px-4 mt-auto">
                          {" "}
                          {/* mt-auto para mantener el botón abajo */}
                          <Button variant={"default"} className="w-full">
                            Ver más
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
          {/* <div className="flex gap-3 ">
            <Button onClick={() => api?.scrollTo(current - 1)}>-</Button>
            <Button onClick={() => api?.scrollTo(current + 1)}>+</Button>
          </div> */}
        </div>
        <div className="flex justify-center w-full mt-4 md:hidden h-fit">
          <button className={`${stylesSearch.button}`}>
            Ver todos los vehículos
          </button>{" "}
        </div>
      </section>
    </>
  );
};

export default NewProducts;
