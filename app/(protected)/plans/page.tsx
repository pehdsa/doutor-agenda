import { PlanCard } from "@/components/PlanCard";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PlansPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Planos</PageTitle>
          <PageDescription>Gerencie os seus planos</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <PlanCard
          className="w-[350px]"
          active={session.user.plan === "essential"}
          userEmail={session.user.email}
        />
      </PageContent>
    </PageContainer>
  );
};

export default PlansPage;
