"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { IoPeople } from "react-icons/io5";
import Link from "next/link";
import { LuArrowUpDown } from "react-icons/lu";
import { IPageLead } from "@/app/models/pagelead";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { IAdmin } from "@/app/models/admin";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuestionsChart = () => {
  const [asignedQuestions, setAsignedQuestions] = useState<IPageLead[]>([]);
  const [questions, setQuestions] = useState<IPageLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [openHandleQuestion, setOpenHandleQuestion] = useState(false);
  const [questionToHandle, setQuestionToHandle] = useState<IPageLead>();
  const { data: session }: any = useSession();
  const [employees, setEmployees] = useState<IAdmin[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IAdmin>();
  const [openConfirmSelectEmployee, setOpenConfirmSelectEmployee] =
    useState<boolean>(false);
  const [message, setMessage] = useState("");

  async function getEmployees() {
    try {
      const employeesFetch = await fetch("/api/employees", {
        method: "GET",
        cache: "no-store",
      }).then((response) => response.json());
      console.log(employeesFetch);

      setEmployees(employeesFetch.employees);
      setLoading(false);
    } catch (error) {}
  }

  async function getQuestions() {
    if (session?.user?.role === "ADMIN") {
      try {
        const questionsFetch = await fetch(`/api/leads/page`, {
          method: "GET",
          cache: "no-store",
        });
        const questions = await questionsFetch.json();

        setLoading(false);
        //setAsignedQuestions(questions.asignedQuestions);
        setQuestions(questions.questions);
      } catch (error) {
        setLoading(false);
        return;
      }
    }

    if (session?.user?.role === "EMPLOYEE") {
      try {
        const questionsFetch = await fetch(
          `/api/leads/page/${session?.user?._id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const questions = await questionsFetch.json();
        setLoading(false);
        //setAsignedQuestions(questions.asignedQuestions);
        setQuestions(questions.questions);
        setAsignedQuestions(questions.asignedQuestions);
      } catch (error) {
        setLoading(false);
        return;
      }
    }
  }

  async function handleSendMessage() {
    const phoneNumber = "549" + questionToHandle?.phone; // Número en formato internacional
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setTimeout(() => {
      window.open(whatsappLink, "_blank");
    }, 300);
  }

  useEffect(() => {
    if (
      session &&
      session.user &&
      session.user.role &&
      questions.length === 0
    ) {
      getQuestions();
    }
  }, [session]);

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    console.log(questionToHandle);
  }, [questionToHandle]);

  return (
    <>
      {loading && (
        <>
          <div
            className="flex items-center justify-center w-full overflow-y-hidden bg-white dark:bg-background"
            style={{ zIndex: "99999999", height: "50vh" }}
          >
            <div className=" loader"></div>
          </div>
        </>
      )}

      {!loading && (
        <>
          {session?.user?.role === "EMPLOYEE" && (
            <>
              <div className="flex items-center justify-between my-4">
                <h2 className="text-xl font-medium ">Consultas asignadas</h2>
              </div>
              {asignedQuestions?.length === 0 && (
                <>
                  <div className="flex flex-col items-center gap-1 justify-center w-full min-h-[300px] h-full">
                    <IoPeople size={70} strokeWidth={0} />
                    <span>
                      Todavia no te han asignado consultas pendientes a
                      responder.
                    </span>
                    <span className="text-sm opacity-50">
                      Aquí aparecerán las consultas que se hagan en la página
                      web que te hayan sido asignadas para responder.
                    </span>
                  </div>
                </>
              )}

              {asignedQuestions?.length > 0 && (
                <Table>
                  <TableCaption>
                    Listado de consultas pendientes asignadas.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="flex items-center gap-1 w-fit">
                        Fecha <LuArrowUpDown />
                      </TableHead>
                      <TableHead className="w-fit">Estado</TableHead>
                      <TableHead className="w-fit">Nombre </TableHead>
                      <TableHead className="w-fit">Teléfono</TableHead>
                      <TableHead className="w-10">Correo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asignedQuestions?.map((question) => (
                      <>
                        <TableRow>
                          <TableCell className="text-xs font-medium w-fit">
                            {dayjs(question.createdAt).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {question?.status === "PENDING" && (
                              <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                                Pendiente
                              </span>
                            )}
                            {question?.status === "ASIGNED" && (
                              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                Contestado
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs font-medium">
                            {question.name} {question.surname}
                          </TableCell>
                          <TableCell className="text-xs font-medium w-fit">
                            {question.phone}
                          </TableCell>
                          <TableCell className="text-xs font-medium w-fit">
                            {question.email}
                          </TableCell>

                          <TableCell className="text-right">
                            {/* edit */}
                            <Link
                              href={`/admin/dashboard/leads/${question._id}`}
                            >
                              <Button
                                variant="outline"
                                className="p-2 w-fit h-fit"
                              >
                                <IoMdMore size={20} className="w-fit h-fit" />
                              </Button>
                            </Link>
                            {/* edit */}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              )}
              <Separator className="my-5" />
            </>
          )}

          <div className="flex items-center justify-between my-4">
            <h2 className="text-xl font-medium ">Consultas pendientes</h2>
            {/* <Link href={"/admin/dashboard/leads/create"}>
          <Button variant="outline" className="flex gap-2 p-2 w-fit h-fit">
            <IoMdAdd size={20} className="w-fit h-fit" />
            <span>Crear lead</span>
          </Button>
        </Link> */}
          </div>

          {questions?.length === 0 && (
            <>
              <div className="flex flex-col items-center gap-1 justify-center w-full min-h-[300px] h-full">
                <IoPeople size={70} strokeWidth={0} />
                <span>Aún no se han hecho consultas.</span>
                <span className="text-sm opacity-50">
                  Aquí aparecerán las consultas que se hagan en la página web.
                </span>
              </div>
            </>
          )}

          {questions?.length > 0 && (
            <Table>
              <TableCaption>Listado de consultas pendientes.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center gap-1 w-fit">
                    Fecha <LuArrowUpDown />
                  </TableHead>
                  <TableHead className="w-fit">Estado</TableHead>
                  <TableHead className="w-fit">Nombre </TableHead>
                  <TableHead className="w-fit">Teléfono</TableHead>
                  <TableHead className="w-10">Correo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions?.map((question) => (
                  <>
                    <TableRow>
                      <TableCell className="text-xs font-medium w-fit">
                        {dayjs(question.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {question?.status === "PENDING" && (
                          <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                            Pendiente
                          </span>
                        )}
                        {question?.status === "ASIGNED" && (
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            Contestado
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        {question.name} {question.surname}
                      </TableCell>
                      <TableCell className="text-xs font-medium w-fit">
                        {question.phone}
                      </TableCell>
                      <TableCell className="text-xs font-medium w-fit">
                        {question.email}
                      </TableCell>

                      <TableCell className="text-right">
                        {/* open asign seller / handle question modal */}
                        <Button
                          variant="outline"
                          onClick={() => {
                            setQuestionToHandle(question);
                            setOpenHandleQuestion(true);
                          }}
                          className="p-2 w-fit h-fit"
                        >
                          <IoMdMore size={20} className="w-fit h-fit" />
                        </Button>
                        {/* open asign seller / handle question modal */}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}

      {/* asign seller / handle question */}
      <Dialog open={openHandleQuestion} onOpenChange={setOpenHandleQuestion}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Responder consulta</DialogTitle>
            <DialogDescription>
              Podés responder la consulta o asignarle un vendedor para que se
              encargue de responderla
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name" className="text-left">
                Asignar vendedor
              </Label>
              <Select
                onValueChange={(e) => {
                  setSelectedEmployee(JSON.parse(e));
                  setOpenConfirmSelectEmployee(true);
                  setOpenHandleQuestion(false);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {employees?.map((employee) => (
                      <SelectItem
                        key={employee._id}
                        value={JSON.stringify(employee)}
                      >
                        {employee.name} {employee.surname}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <span className="mx-auto my-2 text-sm">ó</span>
            <div className="flex flex-col gap-3">
              <Label htmlFor="username" className="text-left">
                Responder consulta por WhatsApp
              </Label>
              <Input
                id="username"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Ingresa un mensaje"
                className="col-span-3"
              />
              <Button
                type="button"
                onClick={handleSendMessage}
                className="bg-green-600 text-white"
              >
                Enviar WhatsApp
              </Button>
            </div>
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>

      {/* confirm asing seller */}
      <AlertDialog
        open={openConfirmSelectEmployee}
        onOpenChange={setOpenConfirmSelectEmployee}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Asignar consulta a vendedor </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que queres asignar la consulta al vendedor{" "}
              {selectedEmployee?.name} {selectedEmployee?.surname}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Asignar consulta</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuestionsChart;
