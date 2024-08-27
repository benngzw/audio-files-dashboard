import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");
  const { isAdmin } = currentUser;

  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar isAdmin={isAdmin} />
      <div className="flex size-full flex-col p-10">
        {children}
      </div>
    </main>
  );
}
