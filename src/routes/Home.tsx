import CreateFileDialog from "@/components/file-dialog";
import FileTile from "@/components/file-tile";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PlusIcon } from "@radix-ui/react-icons";
import { useLiveQuery } from "dexie-react-hooks";

function Home() {
  const files = useLiveQuery(() => db.files.toArray());
  return (
    <div>
      <nav className="border-b p-3">
        <div className="container flex justify-between">
          <p className="text-2xl font-bold">Excalidraw++</p>
          <CreateFileDialog>
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Create
            </Button>
          </CreateFileDialog>
        </div>
      </nav>
      <div className="container mt-3">
        <h1 className="text-xl font-bold">Your Scenes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
          {files
            ? files.map((file, i) => {
                if (!file.id) {
                  return;
                }
                return (
                  <FileTile
                    key={i}
                    name={file.name}
                    id={file.id}
                    createdAt={file.createdAt}
                  />
                );
              })
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Home;
