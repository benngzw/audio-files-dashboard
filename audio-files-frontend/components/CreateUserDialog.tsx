"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/lib/actions"
import { useState } from "react"


const formSchema = z.object({
  username: z.string().min(5).max(25),
  password: z.string().min(3).max(25),
  displayName: z.string().max(25).optional()
})

const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      displayName: ""
    }
  })

  const onSubmit = async (user: any) => {
    const createdUser = await createUser(user);
    if (createdUser) {
      setOpen(false);
    } else {
      setErrorMessage("Failed to create user. Username might already exist.");
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create new user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      id="displayName"
                      placeholder="Enter your displayName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your displayName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <FormMessage>
                {errorMessage}
              </FormMessage>
            )}
            {/* <DialogTrigger asChild> */}
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
            {/* </DialogTrigger> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}

export default CreateUserDialog;