import EditorJS from "@editorjs/editorjs";
import React, { useEffect, useRef, useState } from "react";

// editorjs tools
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";

import TemplateTool from "./TemplateTool";

import TemplateToolInline from "./TemplateToolInline";

interface P {
  placeholders: string[];
  onContent: (content: any) => void;
}

const MailTemplate = ({ placeholders, onContent }: P) => {
  const ejInstance = useRef<any>();

  const [title, setTitle] = useState<string>("");

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      let editor = new EditorJS({
        holder: "editorjs",
        data: {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Start typing...",
              },
            },
          ],
        },
        config: {},
        onReady: () => {
          ejInstance.current = editor;
        },
        onChange: async (editorjs) => {
          let content = await editorjs.saver.save();
          onContent(content);
        },
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          simpleImage: SimpleImage,
          //@ts-ignore
          template: { class: TemplateTool, config: { placeholders } },
          inlineTemplate: {
            //@ts-ignore
            class: TemplateToolInline,
            config: { placeholders },
          },
        },
      });
      console.log("Initialized editor");
    }
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
      return ejInstance.current;
    };
  }, [placeholders]);

  return (
    <React.Fragment>
      <div>
        Available placeholders:<br></br>
        {placeholders.map((pl) => (
          <span
            key={pl}
            className="border rounded-xl text-orange-500 ml-2 px-1 bg-slate-100"
          >
            {`{${pl}}`}
          </span>
        ))}
      </div>
      <div className="mt-3 border-4" id={"editorjs"} />
    </React.Fragment>
  );
};

export default MailTemplate;
