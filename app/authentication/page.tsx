import { SignUpForm } from "@/components/SignUpForm";
import { SignInForm } from "@/components/SignInForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthenticationPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Criar conta</TabsTrigger>
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
