"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AudioTableItem from "./AudioTableItem";

const AudioTable = ({ audio }: { audio: Audio[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Filename</TableHead>
          <TableHead className="w-[150px]">Description</TableHead>
          <TableHead className="w-[150px]">Category</TableHead>
          <TableHead className="w-[150px]">Mimetype</TableHead>
          <TableHead className="w-[150px]">Size</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {audio && audio.length > 0 ? (
          audio.map((singleAudio: Audio) => (
            <AudioTableItem key={singleAudio.id} audio={singleAudio} />
          ))
        ) : null}
      </TableBody>
    </Table>
  );
};

export default AudioTable;