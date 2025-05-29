import { SignUpForm } from "@/components/SignUpForm";
import { SignInForm } from "@/components/SignInForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-8">
      <Image src="/logo.svg" alt="dr.agenda" width={207} height={42} />
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account" className="cursor-pointer">
            Login
          </TabsTrigger>
          <TabsTrigger value="password" className="cursor-pointer">
            Criar conta
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <SignInForm />
        </TabsContent>
        <TabsContent value="password">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
