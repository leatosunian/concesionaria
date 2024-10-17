import { Separator } from "@radix-ui/react-select";
import React from "react";
import LeadEditForm from "@/components/admin/dashboard/leads/LeadEditInfo";

const CreateLeadPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium ">Editar lead</h2>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* chart with branches data */}
          <LeadEditForm />
        </div>
      </div>
    </>
  );
};

export default CreateLeadPage;