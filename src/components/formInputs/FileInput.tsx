import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { inputTypesDiffDynamic } from "../../utils/sample";
import { FileBifercation } from "./FileBifercation";
import { IoMdCloudUpload } from "react-icons/io";
type FileProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};
export default function FileInput({
  item,
  field,
  fieldState,
  formState,
}: FileProps) {
  function handleDragOver(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    field.onChange(files);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    field.onChange(files);
  }

  function updateFileForm(valueFile: any) {
    field.onChange(valueFile);
  }

  function fileUploadEvent(event: React.ChangeEvent<HTMLInputElement>) {
    field.onChange(event.target.files);
  }
  if (item.type === "file") {
    return (
      <div
        className="col-12 col-md-12"
        onDragOver={handleDragOver}
        onDrop={(eve) => handleDrop(eve)}
      >
        {item.isPreview && field.value && !item.square && (
          <FileBifercation
            UpdteValue={updateFileForm}
            PropertyName={item.name}
            clearable={item.clearable}
            SortCategory={field.value}
          />
        )}
        {(!field.value || field.value?.length == 0) && !item.square && (
          <input
            type="file"
            multiple={item.isMulti}
            // {...field}
            name={field.name}
            onChange={(eve) => fileUploadEvent(eve)}
            accept={item.accept}
            className={`${fieldState.error ? "is-invalid" : ""} ${
              item.classinput ? item.classinput : "form-control"
            }`}
          />
        )}
        {item.square && (
          <>
            {item.isPreview && field.value && (
              <FileBifercation
                UpdteValue={updateFileForm}
                PropertyName={item.name}
                clearable={item.clearable}
                SortCategory={field.value}
              />
            )}
            {(!field.value || field.value?.length == 0) && (
              <div
                className={`border-dashed rounded text-center border-secondary ${
                  item.classinput ? item.classinput : ""
                }`}
              >
                <label
                  className="w-100 py-3"
                  htmlFor={`file-input${field.name}`}
                >
                  <IoMdCloudUpload size={150} color="#006FAC" />
                  <p>Drag & drop your files here</p>
                </label>
                <input
                  type="file"
                  multiple={item.isMulti}
                  hidden
                  accept={item.accept}
                  onChange={(eve) => fileUploadEvent(eve)}
                  id={`file-input${field.name}`}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
