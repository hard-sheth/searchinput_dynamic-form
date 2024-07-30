import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { inputTypesDiffDynamic } from "../../utils/sample";

type NumberProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

export default function NumberInput({
  item,
  field,
  fieldState,
  formState,
}: NumberProps) {
  const [formValue, setFormValue] = React.useState(field.value);
  React.useEffect(() => {    
    if (!field.value) {
      setFormValue("");
    } else {
      setFormValue(field.value);
    }
  }, [field.value]);
  function changeSecure(e: KeyboardEvent | KeyboardEvent | any) {
    const eventValue = (e.target as HTMLInputElement).value;
    const pattern = /^[0-9]+$/;
    if (eventValue.match(pattern)) {
      field.onChange(eventValue);
      setFormValue(eventValue);
    } else if (!eventValue) {
      field.onChange(eventValue);
      setFormValue(eventValue);
    }
  }
  return (
    <div className={`input-group`}>
      {item.leftplaceText && (
        <div
          className={`input-group-text ${item.leftClass ? item.leftClass : ""}`}
        >
          {item.leftplaceText}
        </div>
      )}
      <input
        type={"number"}
        name={field.name}
        value={formValue}
        minLength={item.minInput}
        maxLength={item.maxInput}
        className={`${
          fieldState.error
            ? "is-invalid"
            : item.successValidation && formState.isValid
            ? "is-valid"
            : ""
        } ${item.classinput ? item.classinput : "form-control"}`}
        onChange={changeSecure}
        placeholder={`${item.placeholder ? item.placeholder : ""}`}
      />
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
