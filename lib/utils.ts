import { doctorsTable } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.locale("pt-br");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "";

  const words = name
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
}

export function getAvailability(doctor: typeof doctorsTable.$inferSelect) {
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekDay)
    .set("hour", parseInt(doctor.availableFromTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableFromTime.split(":")[1]))
    .set("second", parseInt(doctor.availableFromTime.split(":")[2]))
    .local();
  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekDay)
    .set("hour", parseInt(doctor.availableToTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableToTime.split(":")[1]))
    .set("second", parseInt(doctor.availableToTime.split(":")[2]))
    .local();

  return {
    from,
    to,
  };
}

export function formatCurrencyInCents(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
}
