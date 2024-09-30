"use client";
import LoginForm from "@/components/admin/login/LoginForm";
import Image from "next/image";
import logo from "@/public/dalogo.png";
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen dark">
      <Image alt="as" src={logo} className="mx-auto my-7" width={200} />
      <div className="flex flex-col gap-5 w-fit h-fit dark">
        <span className="text-lg font-semibold ">Iniciar sesión</span>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
