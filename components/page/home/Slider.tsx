import React from "react";
import styles from "@/app/css-modules/home.slider.module.css";
import { motion } from "framer-motion";

const Slider = () => {
  return (
    <section className={styles.sectionCont}>
      <div className="flex flex-col w-full gap-16 sm:w-3/5 ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {/* <h3
            className="text-4xl font-semibold sm:text-5xl xl:text-7xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto, cada vez más cerca
          </h3> */}
          <h3
            className="text-4xl font-semibold sm:text-5xl xl:text-6xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto está en Distrito Automotor
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          {/* <p className="text-sm md:text-base lg:text-lg">
            Unimos 6 marcas líderes del mercado en un mismo lugar. Además,
            tenemos más de 700 usados seleccionados para vos.
          </p> */}
          <p className="text-base md:text-base lg:text-lg">
            La asesoría personalizada que estabas buscando para comprar tu nuevo
            vehículo. Contamos con una selección de más de 50 vehículos nuevos y usados en óptimo estado para vos
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <button className={styles.button}>Ver vehículos</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Slider;
