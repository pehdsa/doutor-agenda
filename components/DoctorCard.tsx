import { doctorsTable } from "@/db/schema";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { UpsertDoctorForm } from "./UpsertDoctorForm";
import {
  formatCurrencyInCents,
  getAvailability,
  getInitials,
} from "@/lib/utils";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const availability = getAvailability(doctor);

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
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm />
        </Dialog>
      </CardFooter>
    </Card>
  );
};
