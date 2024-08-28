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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadAudio } from "@/lib/actions"

const audioCategories = [
  { value: 'music', label: 'Music' },
  { value: 'speech', label: 'Speech' },
  { value: 'sound_effects', label: 'Sound Effects' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'educational', label: 'Educational' },
  { value: 'therapeutic', label: 'Therapeutic' },
  { value: 'audiobooks', label: 'Audiobooks' },
];

const UploadAudioDialog = () => {
  const { register } = useForm();

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
        <form action={uploadAudio}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                {...register("description")}
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select {...register("category")}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {audioCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Audio File
              </Label>
              <Input
                id="file"
                {...register("file")}
                type="file"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogTrigger asChild>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default UploadAudioDialog;