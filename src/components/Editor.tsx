import { db } from "@/lib/db";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useLiveQuery } from "dexie-react-hooks";
import { MoveLeftIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editor() {
  const navigator = useNavigate();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [excaligrawApi, setExcaligrawApi] = useState<ExcalidrawImperativeAPI>();

  const { fileId } = useParams();

  const file = useLiveQuery(
    () => db.files.where({ id: Number(fileId) }).first(),
    [fileId],
  );

  const save = useCallback(async () => {
    if (!excaligrawApi) {
      return;
    }
    const data = {
      elements: excaligrawApi.getSceneElements(),
      appState: excaligrawApi.getAppState(),
      files: excaligrawApi.getFiles(),
    };

    if (data.elements.length <= 0) {
      return;
    }

    await db.files.update(Number(fileId), { data });
  }, [excaligrawApi, fileId]);

  useEffect(() => {
    window.addEventListener("beforeunload", save);
    return () => {
      window.removeEventListener("beforeunload", save);
    };
  }, [save]);

  const debouncedSave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      await save();
    }, 200);
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <Excalidraw
        onChange={debouncedSave}
        excalidrawAPI={(api) => setExcaligrawApi(api)}
        initialData={{
          elements: file.data?.elements,
          appState: file.data?.appState,
          files: file.data?.files,
        }}
      >
        <MainMenu>
          <MainMenu.Item
            icon={<MoveLeftIcon className="text-gray-500" />}
            children="Back To Home"
            onSelect={() => {
              navigator(-1);
            }}
          ></MainMenu.Item>

          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
      </Excalidraw>
    </div>
  );
}

export default Editor;
