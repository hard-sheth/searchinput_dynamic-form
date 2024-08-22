import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import AddressOptionCard from "./Calender/AddressOptionCard";

export interface AddressProps {
  placeaddress: string;
  placeName: string;
  placeIcon?: JSX.Element;
}

interface SearchOptionsProps {
  loadingText?: string;
  btnPlace?: "RIGHT" | "LEFT";
  btnText: JSX.Element;
  startSearch?: "click" | "type";
  optionNullMsg?: JSX.Element;
  selectOptions: AddressProps[] | [];
  updateText: (enterString: unknown | string) => void;
  isLoading: boolean;
  isReload: () => void;
  classSearch?: string;
}

function AddressInput({
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
    updateText(selectValue)
  }, [selectValue]);

  const updateAddress = (item: Omit<AddressProps,'placeIcon'>)=>{
    setSelectValue(item.placeName)
  }

  return (
    <div className="position-relative">
      <div className={`input-group border border-1 ${classSearch ? classSearch : 'rounded'}`}>
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
      </div>
      {showOptions && (
        <div
          className="position-absolute p-0 list-group rounded mt-1 p-0 bg-white border border-1 z-1 "
          style={{
            overflowY: 'auto',
            maxHeight: '250px'
          }}
          ref={ref}
        >
          {selectOptions?.length > 0 &&
            selectOptions.map((item, index: number) => {
              return (
                <AddressOptionCard {...item} index={index} onchageAddress={updateAddress} />
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

export { AddressInput };
