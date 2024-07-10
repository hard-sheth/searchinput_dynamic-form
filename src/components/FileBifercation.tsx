import { useEffect, useState } from "react";
import * as React from "react";
import { PicCard } from "./cards/PicCard";
import { VideoCard } from "./cards/VideoCard";
import { Mp3Card } from "./cards/Mp3Card";
import { DocCard } from "./cards/DocCard";
import { ZipCard } from "./cards/ZipCard";
import { PdfCard } from "./cards/PdfCard";

type fileDetails = {
  SortCategory: File[];
  PropertyName: string;
  UpdteValue?: (PropertyName: string, updateFileList: File | File[]) => void;
  clearable?: boolean;
};

function truncateFileName(fileName: string, maxLength = 20) {
  if (fileName.length <= maxLength) {
    return fileName;
  } else {
    return fileName.slice(0, maxLength) + "...";
  }
}

const picExtensions = ["jpg", "png", "gif", "jpeg"];

const pdfExtensions = ["pdf"];

const zipExtensions = ["zip", "rar"];

const docExtensions = ["txt", "docs", "csv"];

const mp3Extensions = ["mp3", "wav", "ogg", "aiff"];

const mp4Extensions = ["mp4", "mkv", "webm", "3gp", "flv"];

export function FileBifercation({
  SortCategory,
  UpdteValue,
  clearable = true,
  PropertyName,
}: fileDetails) {
  const totalFiles = Array.from(SortCategory);

  if (totalFiles.length > 0) {
    // SortCategory.forEach((file) => {
    // for (const file of SortCategory) {
    const [myFiles, setMyFiles] = useState(totalFiles);
    const updateRemovable = (index: number) => {
      totalFiles.slice(index, 1);
      const updateFiles = myFiles.slice(0, index);
      const update = [
        ...updateFiles,
        ...myFiles.slice(index + 1, myFiles.length),
      ];
      setMyFiles(update);
    };
    useEffect(() => {
      return () => {
        if (UpdteValue) {
          UpdteValue(PropertyName, myFiles);
        }
      };
    }, [myFiles]);

    console.log(myFiles,'myFiles');    

    return (
      <div className="row mx-auto row-cols-1 row-cols-md-6 gap-3 mb-2">
        {myFiles.map((file, index) => {
          const extension = file.name.split(".").pop()?.toLocaleLowerCase();
          const fileNameDisplay = truncateFileName(file.name);
          const blobUrl = URL.createObjectURL(file);
          return (
            <div>
              {extension && picExtensions.includes(extension) && (
                <PicCard
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  link={`${blobUrl}`}
                  removeCard={updateRemovable}
                  key={index}
                  clear={clearable}
                />
              )}
              {extension && pdfExtensions.includes(extension) && (
                <PdfCard
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  link={`${blobUrl}`}
                  removeCard={updateRemovable}
                  key={index}
                  clear={clearable}
                />
              )}
              {extension && zipExtensions.includes(extension) && (
                <ZipCard
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  link={`${blobUrl}`}
                  clear={clearable}
                  removeCard={updateRemovable}
                  key={index}
                />
              )}
              {extension && mp3Extensions.includes(extension) && (
                <Mp3Card
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  clear={clearable}
                  link={`${blobUrl}`}
                  removeCard={updateRemovable}
                  key={index}
                />
              )}
              {extension && mp4Extensions.includes(extension) && (
                <VideoCard
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  link={`${blobUrl}`}
                  clear={clearable}
                  removeCard={updateRemovable}
                  key={index}
                />
              )}
              {extension && mp4Extensions.includes(extension) && (
                <DocCard
                  fileNameDisplay={fileNameDisplay}
                  index={index}
                  clear={clearable}
                  link={`${blobUrl}`}
                  removeCard={updateRemovable}
                  key={index}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
