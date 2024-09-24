"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Ingresa un usuario válido.",
  }),
  password: z.string().min(4, {
    message: "Ingresa una contraseña válida.",
  }),
});
const LoginForm = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const login = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false
      })
      if(login?.ok){
        router.push('/admin/dashboard/stock')
      }
      console.log(login);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu usuario" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu contraseña" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full ">Iniciar sesión</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
