import { getCurrentUser } from "@/lib/actions";
import { UserProvider } from "@/providers/UserProvider";
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");
  console.log(currentUser);

  return (
    <main className="flex h-screen w-full font-inter">
      <div className="flex size-full flex-col p-10">
        <UserProvider>
          {children}
        </UserProvider>
      </div>
    </main>
  );
}
