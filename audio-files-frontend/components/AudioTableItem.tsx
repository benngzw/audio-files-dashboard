import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { deleteAudio, downloadAudio, streamAudio } from "@/lib/actions";
import { Button } from "./ui/button";
import { useState } from "react";

const AudioTableItem = ({ audio }: { audio: Audio }) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteAudio(audio.id);
    } catch (error) {
      console.error('Failed to audio:', error);
    }
  };
  const handlePlay = async () => {
    const audioData = await streamAudio(audio.id);
    console.log(audio.mimeType);
    const audioBlob = new Blob([audioData], { type: audio.mimeType });
    // const audioData = await downloadAudio(audio.id);
    console.log(typeof audioBlob);

    console.log(audioData);
    const url = URL.createObjectURL(audioBlob);
    setAudioSrc(url);
  }



  return (
    <TableRow>
      <TableCell className="font-medium">{audio.fileName}</TableCell>
      <TableCell>{audio.description}</TableCell>
      <TableCell>{audio.category}</TableCell>
      <TableCell>{audio.mimeType}</TableCell>
      <TableCell>{audio.size}</TableCell>
      <TableCell className="text-right">
        {/* <UpdateUserDialog user={user} /> */}
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handlePlay}>Play</Button>
        {audioSrc && (
          <audio controls>
            <source src={`http://localhost:3000/audio/${audio.id}/stream`} type={audio.mimeType} />
            Your browser does not support the audio element.
          </audio>
        )}
        <audio controls>
          <source src={`http://localhost:3000/audio/${audio.id}/stream`} type={audio.mimeType} />
          Your browser does not support the audio element.
        </audio>
      </TableCell>
    </TableRow>
  )
}

export default AudioTableItem;