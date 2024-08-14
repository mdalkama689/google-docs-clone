import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";

const TextEditor = () => {
  const { socket } = useContext(SocketContext);
  const { id: documentId } = useParams();
  const [quill, setQuill] = useState(null);

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  useEffect(() => {
    const quillServer = new Quill("#editor", {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    setQuill(quillServer);
    quillServer.disable(true);
    quillServer.setText("loading....");
  }, []);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleLoadDocument = (document) => {
      quill && quill.setContents(document);
      quill && quill.enable(true);
    };
    socket.once("load-document", handleLoadDocument);
    socket.emit("get-document", documentId);

    return () => {
      socket.off("load-document", handleLoadDocument);
    };
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleTextChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill && quill.on("text-change", handleTextChange);

    return () => {
      quill && quill.off("text-change", handleTextChange);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleTextChange = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handleTextChange);

    return () => {
      socket.off("recieve-changes", handleTextChange);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill && quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <HomeLayout>
      <div className=" absolute top-[68px] bg-gray-200  w-full">
        <div className="fixed left-0 right-0 " id="toolbar-container">
          <div className="container mx-auto p-2"></div>
        </div>

        <div
          className="py-4 px-4 text-xl h-[calc(100vh-4rem)] overflow-auto border-black bg-white mx-36 mb-36 rounded-lg shadow-lg mt-8 "
          id="editor"
        ></div>
      </div>
    </HomeLayout>
  );
};

export default TextEditor;
