import CarList from "@/components/admin/dashboard/stock/CarList";
import React from "react";

const carList = [
  {
    name: "Volkswagen Vento Sportline",
    year: 2016,
    description: "Descripcion",
    kilometers: 120500,
    motor: "2.0 Turbo",
    type: "CAR",
    price: 16500,
    brand: "volkswagen",
    modelName: "Celica",
    status: "AVAILABLE",
    gearbox: "MANUAL",
    doors: "4P",
    gas: "NAFTA",
    currency: "USD",
    show: true,
    uuid: "768fh-dfg356-124d-h45f-dfb3",
    __v: 0,
  },
  {
    name: "Audi S3 Quattro",
    year: 2020,
    description: "Descripcion",
    kilometers: 64500,
    motor: "2.0 TFSI",
    type: "CAR",
    price: 45000,
    brand: "toyota",
    modelName: "Celica",
    status: "AVAILABLE",
    gearbox: "MANUAL",
    doors: "4P",
    gas: "NAFTA",
    currency: "USD",
    show: true,
    uuid: "23124d-1glk-45f-124dh-e34g",
    __v: 0,
  },
  {
    name: "Toyota Celica 2020",
    year: 2020,
    description: "Descripcion",
    kilometers: 64500,
    motor: "1.4 Turbo",
    type: "CAR",
    price: 14350000,
    brand: "toyota",
    modelName: "Celica",
    status: "AVAILABLE",
    gearbox: "MANUAL",
    doors: "4P",
    gas: "NAFTA",
    currency: "ARS",
    show: true,
    uuid: "5345-634-345-h45f-34534h",
    __v: 0,
  },
];

async function getCars() {
  try {
    const carsFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/cars`, {
      method: "GET",
      cache:'no-store'
    });
    const cars = await carsFetch.json();
    console.log(cars);
    
    return cars;
  } catch (error) {
    return;
  }
}

const StockList = async () => {
  const cars = await getCars();
  return (
    <>
      <h3 className="mb-4 text-2xl font-medium md:mb-6 xl:mb-8 ">Mis autos</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-5">
        <CarList cars={cars} />
      </div>
    </>
  );
};

export default StockList;
