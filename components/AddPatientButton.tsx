"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { UpsertPatientForm } from "./UpsertPatientForm";

export const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm isOpen={isOpen} onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};
