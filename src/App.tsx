import React, { useEffect, useState } from "react";
import "./App.css";

import CsvUpload from "./components/CsvUpload";
import MailTemplate from "./components/MailTemplate";
// @ts-ignore
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML({
  template: (block: any) => `<template>${block.data.placeholder}</template>`,
  inlineTemplate: (block: any) =>
    `<template>${block.data.placeholder}</template>`,
});

function App() {
  const [data, setData] = useState<any[]>();

  const [content, setContent] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [mailPlaceholder, setMailPlaceholder] = useState<string>("");

  const [heads, setHeads] = useState<string[]>([]);

  useEffect(() => {
    setHeads(() => (data ? Object.keys(data[0]) : []));
  }, [data]);

  const convertToHtml = (content: any): string => {
    const html = edjsParser.parse(content);
    return html.join("");
  };

  const replacePlaceholders = (html: string, row: any) => {
    const keys = Object.keys(row);
    let str = html;
    for (const key of keys) {
      str = str.replaceAll(`{${key}}`, row[key]);
    }
    return str;
  };

  return (
    <div className="App p-4 grid grid-cols-[50px,minmax(0,1fr)] gap-4 auto-cols-min ">
      <h2 className="w-12 font-black flex justify-center">1</h2>
      <CsvUpload
        onData={(json) => {
          setData(json);
        }}
      />
      <h2 className="w-12 font-black flex justify-center">2</h2>
      <div>
        <label htmlFor="title">Subject: </label>
        <input
          id="title"
          name="title"
          type="text"
          size={100}
          className="border mb-3"
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <MailTemplate placeholders={heads || []} onContent={setContent} />
      </div>
      <h2 className="w-12 font-black flex justify-center">3</h2>
      <div>
        <label htmlFor="mailPl">E-Mail column: </label>
        <select
          id="mailPl"
          name="mailPl"
          onChange={(ev) => {
            console.log(ev.target.value);
            setMailPlaceholder(ev.target.value);
          }}
        >
          {heads?.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <table className="mt-3 border-separate border-spacing-2 border">
          <thead>
            <tr>
              {heads?.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                {heads?.map((key) => (
                  <td key={key} className="px-5">
                    {row[key]}
                  </td>
                ))}
                <td>
                  <button
                    onClick={() =>
                      // ;subject=${encodeURI(title || "Subject")}
                      window.open(
                        // prettier-ignore
                        `mailto:${encodeURI(row[mailPlaceholder])}?body=${encodeURI(replacePlaceholders(convertToHtml(content), row))}`,
                        "_target"
                      )
                    }
                  >
                    Send mail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
