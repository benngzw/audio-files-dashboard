"use client"

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
import { streamAudio } from "@/lib/actions"

const AudioPlayerDialog = ({ audio }: { audio: Audio }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Play Audio</DialogTitle>
          <DialogDescription>
            Upload audio here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogTrigger asChild>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogTrigger>
      </DialogContent>
    </Dialog >
  )
}

export default AudioPlayerDialog;