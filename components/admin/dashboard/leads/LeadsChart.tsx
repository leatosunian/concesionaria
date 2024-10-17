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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILead } from "@/app/models/lead";
import dayjs from "dayjs";
import { BiTaskX } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";

const LeadsChart = () => {
  const [leads, setLeads] = useState<ILead[]>([]);

  async function getLeads() {
    try {
      const leadsFetch = await fetch("/api/leads", {
        method: "GET",
        cache: "no-store",
      });
      const leads = await leadsFetch.json();
      console.log(leads.leads);

      setLeads(leads.leads);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <>
      {leads?.length === 0 && (
        <>
          <div className="flex flex-col items-center gap-1 justify-center w-full min-h-[300px] h-full">
            <IoPeople  size={70} strokeWidth={0} />
            <span>Tu lista de leads está vacía.</span>
            <span className="text-sm opacity-50">
              Creá un nuevo lead para comenzar a gestionar tu nuevo cliente.
            </span>


          </div>
        </>
      )}

      {leads?.length > 0 && (
        <Table>
          <TableCaption>Listado de leads.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="md:w-[300px] w-fit">Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Veh. de interés</TableHead>
              <TableHead>Último contacto</TableHead>
              <TableHead>Próxima tarea</TableHead>

              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads?.map((lead) => (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    {lead.name} {lead.surname}
                  </TableCell>
                  <TableCell className="font-medium">{lead.status}</TableCell>
                  <TableCell className="font-medium">
                    {lead.interestedIn}
                  </TableCell>
                  <TableCell className="font-medium">
                    {dayjs(lead.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {lead.pendingTask}
                  </TableCell>

                  <TableCell className="text-right">
                    {/* edit */}
                    <Button variant="outline" className="p-2 w-fit h-fit">
                      <IoMdMore size={20} className="w-fit h-fit" />
                    </Button>
                    {/* edit */}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default LeadsChart;
