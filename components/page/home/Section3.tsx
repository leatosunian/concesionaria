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
          <div className="flex flex-col w-full gap-10 sm:w-2/3 ">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <h3
                className="text-4xl font-semibold sm:text-4xl "
                style={{ letterSpacing: ".5px" }}
              >
                CAMBIÁ TU USADO
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <p>
                Realizá tu evaluación gratuita. Pagamos más por tu usado. Lo
                cotizamos al instante. ¡La forma más fácil y segura de vender tu
                auto!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <button className={styles.button}>Cotizar mi auto</button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
