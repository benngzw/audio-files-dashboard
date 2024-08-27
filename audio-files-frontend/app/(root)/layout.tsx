import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  if (!currentUser) redirect("/sign-in");
  console.log(currentUser);

  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar />
      <div className="flex size-full flex-col p-10">
        {children}
      </div>
    </main>
  );
}
