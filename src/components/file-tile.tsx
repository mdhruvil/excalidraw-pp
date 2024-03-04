import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CopyIcon,
  DotsVerticalIcon,
  DrawingPinIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import FileDialog from "./file-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

type Props = {
  name: string;
  id: number;
  createdAt: Date;
};

function FileTile({ name, id, createdAt }: Props) {
  async function deleteFile() {
    await db.files.delete(id);
  }
  return (
    <div className="group w-auto rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-primary-foreground hover:shadow-md">
      <Link to={`/files/${id}`}>
        <img
          src="https://placehold.co/200"
          alt=""
          className="w-full rounded object-contain"
        />
      </Link>
      <div className="flex ">
        <Link to={`/files/${id}`} className="w-full">
          <div>
            <p className="text-lg">{name}</p>
            <p className="text-xs">
              {formatDistance(createdAt, new Date())} ago
            </p>
          </div>
        </Link>
        <div className="mt-2 flex justify-center opacity-0 group-hover:opacity-100">
          <FileDialog
            file={{
              name,
              id,
            }}
          >
            <Button size="icon" variant="ghost" className="size-7">
              <Pencil1Icon className="size-4" />
            </Button>
          </FileDialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="size-7">
                  <DotsVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <DrawingPinIcon className="mr-2 size-4" />
                  Pin
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon className="mr-2 size-4" />
                  Duplicate
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <TrashIcon className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this scene.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={cn(buttonVariants({ variant: "destructive" }))}
                  onClick={deleteFile}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default FileTile;
