import { propCardFile } from "./VideoCard";
import { FaFileImage } from "react-icons/fa";
import * as React from "react";

function PicCard({ fileNameDisplay, clear, link, index, removeCard }: propCardFile) {
  return (
    <div className="border p-1 py-2 rounded col position-relative">
      {clear&&<button
        type="button"
        onClick={() => {
          removeCard(index);
        }}
        className="btn-close position-absolute top-0 end-0"
      ></button>}
      <a href={`${link}`} target="_blank" className="text-center mt-3">
        <p>
          <FaFileImage size={60} />
        </p>
      </a>
      <a
        href={`${link}`}
        target="_blank"
        className="form-text ms-1 text-center border-0 border-bottom-0 "
      >
        <p>{fileNameDisplay}</p>
      </a>
    </div>
  );
}

export { PicCard };
