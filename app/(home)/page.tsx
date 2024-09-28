"use client";

import Header from "@/components/page/Header";
import AdminHeader from "@/components/page/AdminHeader";
import Footer from "@/components/page/home/Footer";
import NewProducts from "@/components/page/home/NewProducts";
import Section2 from "@/components/page/home/Section2";
import Slider from "@/components/page/home/Slider";
import { Suspense, useEffect, useState } from "react";
import { ICar } from "../models/car";
import Section3 from "@/components/page/home/Section3";
import Search from "@/components/page/home/Search";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";

const Home = () => {
  const [latestVehicles, setLatestVehicles] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function getLastVehicles() {
    const latestVehicles = await fetch("/api/cars/latests", {
      method: "GET",
      cache: "no-cache",
    }).then((response) => response.json());
    if (latestVehicles.length !== 0) {
      setLatestVehicles(latestVehicles);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLastVehicles();
    //fetch 10 lastest vehicles
  }, []);

  return (
    <>
      <Suspense>
        {loading && <LoaderFullscreen />}
        <div className="w-full">
          <Header />
          <Slider />
          <Search />
          <div
            className="mx-auto"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: " rgba(0, 0, 0, 0.1)",
            }}
          ></div>
          <Section3 />
          <NewProducts vehicles={latestVehicles} />
          {/* <div className="w-full h-20" ></div> */}
          <Section2 />

          <div className="w-full h-20"></div>

          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
