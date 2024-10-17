import { Separator } from "@radix-ui/react-select";
import React from "react";
import LeadInfoForm from "@/components/admin/dashboard/leads/LeadDetails";

const CreateLeadPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium ">Gestionar lead</h2>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="">
          {/* chart with branches data */}
          <LeadInfoForm />
        </div>
      </div>
    </>
  );
};

export default CreateLeadPage;
