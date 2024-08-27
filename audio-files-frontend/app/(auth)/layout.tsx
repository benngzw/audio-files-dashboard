import { getCurrentUser, getLoggedInUser } from "@/lib/actions";
import { UserProvider, useUser } from "@/providers/UserProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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