import Editor from "@/components/Editor";
import { useParams } from "react-router-dom";

function File() {
  const { fileId } = useParams();

  if (!fileId) {
    return <div>File not found</div>;
  }

  return (
    <div className="h-screen">
      <Editor />
    </div>
  );
}

export default File;
