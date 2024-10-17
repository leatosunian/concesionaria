import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ message: "Ingresá un nombre." }).min(1, {
    message: "Ingresa un nombre.",
  }),
  surname: z
    .string({
      message: "Ingresa un año..",
    })
    .min(4, {
      message: "Ingresa un año.",
    }),
  contactType: z.string().min(1, {
    message: "Selecciona una marca.",
  }),
  businessType: z.string().min(1, {
    message: "Ingresa un kilometraje.",
  }),
  address: z.string().min(1, {
    message: "Ingresá un motor.",
  }),
  city: z.string().min(1, {
    message: "Selecciona un tipo de vehículo.",
  }),
  state: z.string().min(1, {
    message: "Selecciona una moneda.",
  }),
  observations: z.string().min(1, {
    message: "Ingresa un precio.",
  }),
  phone: z.string().min(1, {
    message: "Ingresá un modelo.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  gas: z.string().min(1, {
    message: "Selecciona un combustible.",
  }),
  description: z.string().optional().or(z.literal("")),

  leadName: z.string({ message: "Ingresá un nombre." }).min(1, {
    message: "Ingresa un nombre.",
  }),
  leadYear: z
    .string({
      message: "Ingresa un año..",
    })
    .min(4, {
      message: "Ingresa un año.",
    }),
  leadBrand: z.string().min(1, {
    message: "Selecciona una marca.",
  }),
  leadKilometers: z.string().min(1, {
    message: "Ingresa un kilometraje.",
  }),
  leadMotor: z.string().min(1, {
    message: "Ingresá un motor.",
  }),
  leadType: z.string().min(1, {
    message: "Selecciona un tipo de vehículo.",
  }),
  leadCurrency: z.string().min(1, {
    message: "Selecciona una moneda.",
  }),
  leadPrice: z.string().min(1, {
    message: "Ingresa un precio.",
  }),
  leadModelName: z.string().min(1, {
    message: "Ingresá un modelo.",
  }),
  leadGearbox: z.string().min(1, {
    message: "Selecciona una transmisión",
  }),
  leadDoors: z.string().min(1, {
    message: "Selecciona una cantidad de puertas.",
  }),
  leadGas: z.string().min(1, {
    message: "Selecciona un combustible.",
  }),
  leadDescription: z.string().optional().or(z.literal("")),
});
