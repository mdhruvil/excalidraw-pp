import { db } from "@/lib/db";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Editor() {
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
      />
    </div>
  );
}

export default Editor;
