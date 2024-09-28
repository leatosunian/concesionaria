"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/css-modules/home.search.module.css";
import { motion } from "framer-motion";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  console.log(searchParams.get("search"));

  const handleSearch = () => {
    console.log(searchValue);
    const params = new URLSearchParams(searchParams);
    if (searchValue !== "") {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    push(`/vehicles/?${params.toString()}`);
    console.log(params.toString());
  };

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <>
      <div
        className={`${styles.cont} z-0 flex flex-col items-center justify-center w-full gap-5 px-5 py-20 sm:py-24 sm:px-0 h-fit`}
      >
        <motion.div
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
          className="z-50 flex flex-col gap-2 overflow-hidden w-fit h-hit"
        >
          <h4 className="text-2xl font-bold text-center sm:text-3xl">
            Encontrá el vehículo que estás buscando
          </h4>
          <span className="text-sm text-center text-gray-500 sm:text-base">
            Tenemos unidades usadas y 0km para todos los gustos y necesidades
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
          className="w-full py-2 mt-0 overflow-hidden md:mt-2 px-auto md:w-fit h-hit"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className={`${styles.form} mx-auto `}
          >
            <button type="button" disabled>
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              className={`${styles.input}`}
              placeholder="Ingresa una marca o modelo..."
              type="text"
            />
            <button
              className={`${styles.reset}`}
              onClick={() => setSearchValue("")}
              type="reset"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.8 }}
          className="overflow-hidden w-fit h-hit"
        >
          <button onClick={handleSearch} className={styles.button}>
            Buscar
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default Search;
