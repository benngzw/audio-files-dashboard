import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect("/");

  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
    </main>
  );
}