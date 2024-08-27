import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { deleteAudio } from "@/lib/actions";
import { Button } from "./ui/button";
// import UpdateUserDialog from "./UpdateUserDialog";

const AudioTableItem = ({ audio }: { audio: Audio }) => {
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
      <TableCell>{audio.mimeType}</TableCell>
      <TableCell>{audio.size}</TableCell>
      <TableCell className="text-right">
        {/* <UpdateUserDialog user={user} /> */}
        <Button onClick={handleDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

export default AudioTableItem;