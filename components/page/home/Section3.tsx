import React from "react";
import styles from "@/app/css-modules/home.section3.module.css";
import { motion } from "framer-motion";
const Section3 = () => {
  return (
    <>
      <div className={`${styles.parallaxCont}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-full h-full bg-black "
        ></motion.div>
        <div className={`${styles.content}`}>
          <div className="flex flex-col w-full gap-16 sm:w-4/5 ">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <h3
                className="text-5xl font-semibold sm:text-5xl lg:text-6xl "
                style={{ letterSpacing: ".5px" }}
              >
                Vendé tu usado con nosotros
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              className="mt-0"
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-base md:text-lg lg:text-lg">
                Solicitanos una evaluación gratuita de tu vehículo. Lo cotizamos
                al instante y al mejor precio del mercado, pagamos por tu usado
                lo que realmente vale.
              </p>
              <p className="text-base mt-2 md:text-lg lg:text-lg">
                Dejaremos tu vehículo en óptimas condiciones y lo pondremos a la
                venta. En un plazo máximo de 45 dias tu unidad será vendida.
              </p>
              <p style={{borderBottom: '1px solid red'}} className="text-base block sm:hidden w-fit font-semibold mt-11 md:text-lg lg:text-2xl">
                ¡La
                forma más fácil de vender tu auto!
              </p>
              <p style={{borderBottom: '1px solid red'}} className="text-base w-fit hidden sm:block font-semibold mt-11 md:text-lg lg:text-2xl">
                ¡La
                forma más fácil y segura de vender tu auto!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <button className={styles.button}>Cotizar mi usado</button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
