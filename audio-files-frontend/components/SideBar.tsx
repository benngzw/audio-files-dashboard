"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/lib/actions'
import { useRouter } from 'next/router'

const SideBar = async ({ isAdmin }: { isAdmin: boolean }) => {
  const signOut = async () => {
    try {
      await logout();
      console.log("Signed out");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  }

  return (
    <nav className="w-36 bg-gray-100 p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="text-black">
            Home
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link href="/user-admin" className="text-black">
              User Admin
            </Link>
          </li>
        )}
        <li>
          <Button
            onClick={signOut}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar