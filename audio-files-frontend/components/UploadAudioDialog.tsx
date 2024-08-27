"use client"

import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { uploadAudio } from "@/lib/actions"

const UploadAudioDialog = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (audio: any) => {
    const data = new FormData();
    data.append('file', audio.file[0]);


    // console.log(audio);

    uploadAudio(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Audio</DialogTitle>
          <DialogDescription>
            Upload audio here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                {...register("username")}
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="displayName" className="text-right">
                Display Name
              </Label>
              <Input
                id="displayname"
                {...register("displayName")}
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="file"
                {...register("file")}
                type="file"
                className="col-span-3"
              />
            </div>
          </div>
          {/* <DialogTrigger asChild> */}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          {/* </DialogTrigger> */}
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default UploadAudioDialog;