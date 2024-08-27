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

const AudioPlayerDialog = ({ audio }: { audio: Audio }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{audio.fileName}</DialogTitle>
        </DialogHeader>
        <audio controls>
          <source src={`http://localhost:3000/audio/${audio.id}/stream`} type={audio.mimeType} />
          Your browser does not support the audio element.
        </audio>
      </DialogContent>
    </Dialog >
  )
}

export default AudioPlayerDialog;