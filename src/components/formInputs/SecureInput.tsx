import { useState } from "react";
import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { inputTypesDiffDynamic } from "../../utils/sample";

type SecureProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

export default function SecureInput({
  item,
  field,
  fieldState,
  formState,
}: SecureProps) {
  const [secureValue, setSecureValue] = useState("");
  function changeSecure(e: KeyboardEvent | KeyboardEvent | any) {
    const eventValue = (e.target as HTMLInputElement).value;
    const pattern = /^[0-9]+$/;
    if (eventValue.match(pattern)) {
      field.onChange(eventValue);
      setSecureValue(eventValue);
    } else if (!eventValue) {
      field.onChange(eventValue);
      setSecureValue(eventValue);
    }
  }
  if (item.type === "secure") {
    return (
      <div className={`input-group`}>
        {item.leftplaceText && (
          <div
            className={`input-group-text ${
              item.leftClass ? item.leftClass : ""
            }`}
          >
            {item.leftplaceText}
          </div>
        )}
        {item.inputType == "number" && (
          <input
            type={"password"}
            // {...field}
            value={secureValue}
            className={`${
              fieldState.error
                ? "is-invalid"
                : item.successValidation && formState.isValid
                ? "is-valid"
                : ""
            } ${item.classinput ? item.classinput : "form-control"}`}
            onChange={changeSecure}
            placeholder={`${item.placeholder ? item.placeholder : ""}`}
            autoComplete={item.name}
            minLength={item.minInput}
            maxLength={item.maxInput}
          />
        )}
        {item.inputType == "text" && (
          <input
            type={"password"}
            minLength={item.minInput}
            maxLength={item.maxInput}
            {...field}
            className={`${
              fieldState.error
                ? "is-invalid"
                : item.successValidation && formState.isValid
                ? "is-valid"
                : ""
            } ${item.classinput ? item.classinput : "form-control"}`}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            placeholder={`${item.placeholder ? item.placeholder : ""}`}
            autoComplete="off"
          />
        )}
        {item.rightplaceText && (
          <div
            className={`input-group-text ${
              item.rightClass ? item.rightClass : ""
            }`}
          >
            {item.rightplaceText}
          </div>
        )}
        {item.successValidation && item.successValidationMessage && (
          <div className="valid-feedback">{item.successValidationMessage}</div>
        )}
        {fieldState.error && (
          <div className="invalid-feedback">
            {fieldState.error?.message as React.ReactNode}
          </div>
        )}
      </div>
    );
  }
}
