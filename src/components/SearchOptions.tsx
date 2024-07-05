import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ReactLoading from "react-loading";

interface SelectOptionsLabel {
  label: string;
  value?: string | unknown | any;
}

interface SelectOptionsLbl extends SelectOptionsLabel {
  options?: SelectOptionsLabel[];
}

type PropsType = {
  searchPromise: () => void;
  onClick?: () => void;
};

interface SearchOptionsProps {
  loadingText?: string;
  btnPlace?: "RIGHT" | "LEFT";
  btnText: JSX.Element;
  startSearch?: "click" | "type";
  optionNullMsg?: JSX.Element;
  selectOptions: SelectOptionsLabel[] | SelectOptionsLbl[]| [];
  updateText: (enterString: unknown | string) => void;
  isLoading: boolean;
  isReload: () => void;
  classSearch?: string;
}

function SearchOptions({
  loadingText,
  btnPlace,
  btnText,
  startSearch,
  optionNullMsg,
  selectOptions = [],
  updateText,
  isLoading,
  classSearch,
  isReload,
}: SearchOptionsProps) {
  const [selectValue, setSelectValue] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  const ref: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (startSearch == "type") {
      isReload();
    }
    updateText(selectValue)
  }, [selectValue]);
  return (
    <div className="position-relative">
      <div className={`input-group border border-1 ${classSearch?classSearch:'rounded'}`}>
        {btnPlace == "LEFT" && (
          <div className="input-group-item ">
            <button
              type="button"
              className="btn bg-transparent"
              onClick={() => {
                if (startSearch == "click") {
                  isReload();
                  setShowOptions(true);
                }
              }}
            >
              {btnText}
            </button>
          </div>
        )}
        <input
          type="search"
          className="form-control border-0 bg-transparent shadow-none"
          value={selectValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowOptions(true);
              isReload();
            }
          }}
          onChange={(e) => {
            if (selectValue.length > 0) {
              setShowOptions(true);
            } else if (selectValue.length == 0) {
              setShowOptions(false);
            }
            setSelectValue(e.target.value);
          }}
        />
        {isLoading && (
          <div className="input-group-item">
            <ReactLoading
              type={"bubbles"}
              color="black"
              height={"100%"}
              width={"30px"}
            />
          </div>
        )}
        {btnPlace == "RIGHT" && (
          <div className="input-group-item ">
            <button
              type="button"
              className="btn bg-transparent"
              onClick={() => {
                if (startSearch == "click") {
                  isReload();
                  setShowOptions(true);
                }
              }}
            >
              {btnText}
            </button>
          </div>
        )}
      </div>
      {showOptions && (
        <div
          className="position-absolute rounded mt-2 w-100 bg-white border border-1"
          style={{
            overflowY:'auto',
            maxHeight:'250px'
          }}
          ref={ref}
        >
          {selectOptions?.length > 0 &&
            selectOptions.map((item: SelectOptionsLabel, index: any) => {
              return (
                <div
                  key={index}
                  className={`ps-4 `}
                  onClick={() => {
                    setSelectValue(item.value);
                    setShowOptions(false);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          {selectOptions.length == 0 && (
            <div className="text-center py-3">{optionNullMsg}</div>
          )}
          {isLoading && <div className="text-center py-3"> {loadingText} </div>}
        </div>
      )}
    </div>
  );
}

export { SearchOptions };
