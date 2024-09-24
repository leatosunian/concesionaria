"use client";
import React from "react";
import styles from "@/app/css-modules/home.section2.module.css";
import { SiCashapp } from "react-icons/si";
import { FaCar } from "react-icons/fa";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
const Section2 = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <>
      <section className="relative">
        <div className="relative flex items-center content-center justify-center pt-16 pb-32 min-h-screen-100 ">
          <div className={`absolute top-0 w-full h-full ${styles.bgSection}`}>
            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-20"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 ml-auto mr-auto text-center lg:w-8/12">
                <div className="">
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "some", once: true }}
                    transition={{
                      duration: 0.7,
                      ease: "circInOut",
                      delay: 0.2,
                    }}
                  >
                    <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                      Trae tu vehículo, nostros lo vendemos.
                    </h1>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: "some", once: true }}
                    transition={{
                      duration: 0.7,
                      ease: "circInOut",
                      delay: 0.5,
                    }}
                  >
                    <p className="mt-8 text-base text-white sm:text-lg">
                      Asesoría personalizada, garantía extendida y servicio de
                      posventa, para que comprar un auto usado, se sienta como
                      cero.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="pb-10 -mt-24 bg-blueGray-200">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 0.4 }}
                className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white rounded-full shadow-lg" style={{backgroundColor:'#fe171e'}}>
                      <SiCashapp />
                    </div>
                    <h6 className="text-xl font-semibold">Financiación</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Conocé los planes disponibles y subite a tu próximo auto
                      con financiación.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 0.8 }}
                className="w-full px-4 text-center md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-5 text-center text-white rounded-full shadow-lg" style={{backgroundColor:'#fe171e'}}>
                      <CgArrowsExchangeAltV size={30} />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Transferimos tu unidad
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Nos encargamos de que salgas de la agencia con tu vehículo
                      transferido listo para usar
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 1 }}
                className="w-full px-4 pt-6 text-center md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-5 text-center text-white rounded-full shadow-lg " style={{backgroundColor:'#fe171e'}}>
                      <FaCar className="m-auto" />
                    </div>
                    <h6 className="text-xl font-semibold">Usados y 0KM</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Tenemos vehículos nuevos y usados para todos los gustos y
                      necesidades de nuestros clientes
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Section2;
