"use client";

import { useState } from "react";
import { doctorsTable } from "@/db/schema";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  Loader2,
  Trash2Icon,
} from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { UpsertDoctorForm } from "./UpsertDoctorForm";
import {
  formatCurrencyInCents,
  getAvailability,
  getInitials,
} from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteDoctor } from "@/actions/delete-doctor";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlerModalOpen, setIsAlerModalOpen] = useState(false);
  const availability = getAvailability(doctor);

  const deleteDoctorAction = useAction(deleteDoctor, {
    onSuccess: () => {
      toast.success("Médico deletado com sucesso!");
      setTimeout(() => {
        setIsAlerModalOpen(false);
      }, 1000);
    },
    onError: () => {
      toast.error("Erro ao deletar médico. Tente novamente.");
    },
  });

  const handleDeleteDoctor = async () => {
    if (!doctor?.id) {
      toast.error("Médico não encontrado.");
      return;
    }
    deleteDoctorAction.execute({
      id: doctor.id,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary-foreground">
              {getInitials(doctor.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        {/* <div className="flex">
          <div className="flex gap-1 rounded-full bg-primary-foreground text-xs items-center justify-center py-1 px-3">
            <CalendarIcon className="size-3 mr-1" />
            {availability.from.format("dddd")} a{" "}
            {availability.to.format("dddd")}
          </div>
        </div> */}

        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} a {availability.to.format("dddd")}
        </Badge>
        <Badge variant="outline" className="">
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} as{" "}
          {availability.to.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="gap-1">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="grow w-fit">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            onSuccess={() => setIsOpen(false)}
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
          />
        </Dialog>

        <AlertDialog open={isAlerModalOpen} onOpenChange={setIsAlerModalOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="border-destructive">
              <Trash2Icon
                color="oklch(0.577 0.245 27.325)"
                className="size-3"
              />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar este médico?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso irá remover o médico e
                todas as consutas agendadas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button
                onClick={handleDeleteDoctor}
                disabled={deleteDoctorAction.isExecuting}
                variant="destructive"
              >
                {deleteDoctorAction.isExecuting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Deletar"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
