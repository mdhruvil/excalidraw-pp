import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type PropsWithChildren } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { db } from "@/lib/db";
import { useNavigate } from "react-router-dom";

interface FileDialogProps extends PropsWithChildren {
  file?: {
    name: string;
    id: number;
  };
}

function FileDialog({ children, file }: FileDialogProps) {
  const [name, setName] = useState(file?.name || "");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function createFile() {
    const id = await db.files.add({
      name,
      createdAt: new Date(),
    });
    setOpen(false);
    navigate(`/files/${id}`);
  }

  async function updateFile() {
    if (!file?.id) {
      return console.error("No file id found");
    }
    await db.files.update(file.id, { name });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {file?.id ? "Update Scene" : "Create Scene"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Scene Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={file?.id ? updateFile : createFile}>
            {file?.id ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FileDialog;
