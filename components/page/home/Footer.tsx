import React from "react";
import Image from "next/image";
import logo from "@/public/dalogoblack.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
const Footer = () => {
  return (
    <>
      <footer
        style={{ borderTop: "1px solid #0000001f" }}
        className="relative pt-8 pb-6 bg-blueGray-200"
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full px-4 lg:w-6/12">
              {/* <h4 className="text-3xl fonat-semibold text-blueGray-700">
                HASCAR
              </h4> */}
              <Image src={logo} alt="" width={260} height={200} className="block md:hidden"/>
              <Image src={logo} alt="" width={340} height={200} className="md:block hidden"/>
              <h5 className="mt-3 mb-2 ml-2 text-md md:text-base text-blueGray-600">
                +12 años de trayectoria en el mercado de vehículos
              </h5>
              <div className="mt-6 mb-6 lg:mb-0">
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-400 align-center focus:outline-none"
                  type="button"
                >
                  <FaTwitter className="m-auto" />
                </button>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                  type="button"
                >
                  <FaInstagram className="m-auto" />
                </button>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-blueGray-800 align-center focus:outline-none"
                  type="button"
                >
                  <FaFacebook className="m-auto" />
                </button>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
                  type="button"
                >
                  <SiMercadopago className="m-auto" />
                </button>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full px-4 mt-5 ml-auto lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    Links rápidos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                        Vehículos
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://blog.creative-tim.com?ref=njs-profile"
                      >
                        Sobre nosotros
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Contacto
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    contactanos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        +54 9 2235422030
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        +54 9 2234425537
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href={
                          "https://creative-tim.com/privacy?ref=njs-profile"
                        }
                      >
                        info@hascar.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    horario de atención
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        Lun. a Vie. de 10 a 17hs
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        Sábados de 10 a 13hs
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 mx-auto text-center md:w-4/12">
              <div className="py-1 text-sm font-semibold text-blueGray-500">
                Copyright © <span id="get-current-year">2024 </span>
                <span className="text-blueGray-500 hover:text-gray-800">
                  Distrito Automotor by{" "}
                  <a
                    href={"https://www.creative-tim.com?ref=njs-profile"}
                    className="text-blueGray-500 hover:text-blueGray-800"
                  >
                    tosunian.dev
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
