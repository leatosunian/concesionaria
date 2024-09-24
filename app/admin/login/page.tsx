import LoginForm from "@/components/admin/login/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen dark" >
      <div className="flex flex-col gap-5 w-fit h-fit dark">
        <span className="text-2xl font-semibold ">Iniciar sesión</span>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
