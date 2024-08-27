"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const AudioPlayerDialog = ({ audio, backendHost }: { audio: Audio, backendHost: string }) => {
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
          <source src={`${backendHost}/audio/${audio.id}/stream`} type={audio.mimeType} />
          Your browser does not support the audio element.
        </audio>
      </DialogContent>
    </Dialog >
  )
}

export default AudioPlayerDialog;