import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import csv from "csvtojson";

const fileTypes = ["CSV"];

interface P {
  onData: (json: any[]) => void;
}

function CsvUpload({ onData }: P) {
  const handleChange = async (file: File) => {
    const text = await file.text();
    csv()
      .fromString(text)
      .then((data) => onData(data));
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default CsvUpload;
