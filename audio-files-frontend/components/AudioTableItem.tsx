import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { deleteAudio } from "@/lib/actions";
import { Button } from "./ui/button";
import AudioPlayerDialog from "./AudioPlayerDialog";

const AudioTableItem = ({ audio, backendHost }: { audio: Audio, backendHost: string }) => {
  const handleDelete = async () => {
    try {
      await deleteAudio(audio.id);
    } catch (error) {
      console.error('Failed to audio:', error);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{audio.fileName}</TableCell>
      <TableCell>{audio.description}</TableCell>
      <TableCell>{audio.category}</TableCell>
      <TableCell>{audio.mimeType}</TableCell>
      <TableCell>{audio.size}</TableCell>
      <TableCell className="text-right">
        <AudioPlayerDialog audio={audio} backendHost={backendHost} />
        <Button className="mx-2" onClick={handleDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

export default AudioTableItem;