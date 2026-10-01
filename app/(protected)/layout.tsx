import { requireUser } from "@/lib/auth";
import { platformNavigation } from "@/config/platform-navigation";
import { PlatformShell } from "@/components/platform-shell";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();
  const name = (user.user_metadata?.full_name as string | undefined) || user.email || "Amanah user";
  return <PlatformShell name={name} groups={platformNavigation}>{children}</PlatformShell>;
}
