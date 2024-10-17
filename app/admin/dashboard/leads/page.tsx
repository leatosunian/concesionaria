import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import React from "react";
import { IoMdAdd, IoMdMore } from "react-icons/io";
import LeadsChart from "@/components/admin/dashboard/leads/LeadsChart";
import Link from "next/link";

const LeadsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium ">Mis leads</h2>
        <Link href={"/admin/dashboard/leads/create"}>
          <Button variant="outline" className="p-2 w-fit flex gap-2 h-fit">
            <IoMdAdd size={20} className="w-fit h-fit" />
            <span>Crear lead</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* chart with branches data */}
          <LeadsChart />
        </div>
      </div>
    </>
  );
};

export default LeadsPage;
