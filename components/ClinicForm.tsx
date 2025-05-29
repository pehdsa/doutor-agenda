"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { createClinic } from "@/actions/create-clinic";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const clinicFormSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
});

export const ClinicForm = () => {
  //   const router = useRouter();
  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clinicFormSchema>) {
    try {
      await createClinic(values.name);
      //   router.push("/dashboard");
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.error("Error creating clinic:", error);
      toast.error("Erro ao criar clínica");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Criando clínica
                </>
              ) : (
                "Criar Clínica"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
