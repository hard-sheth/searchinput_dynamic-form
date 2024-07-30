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

export default function FloatNumberInput({
  item,
  field,
  fieldState,
  formState,
}: NumberProps) {
  if (item.type === "float") {
    const [formValue, setFormValue] = React.useState(field.value);
    React.useEffect(() => {
      if (!field.value) {
        setFormValue("");
      } else {
        setFormValue(field.value);
      }
    }, [field.value]);
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
        <input
          type={"number"}
          name={field.name}
          value={formValue}
          step={item.step}
          className={`${
            fieldState.error
              ? "is-invalid"
              : item.successValidation && formState.isValid
              ? "is-valid"
              : ""
          } ${item.classinput ? item.classinput : "form-control"}`}
          onKeyUp={(e) => {
            if (
              e.key != "ArrowUp" &&
              e.key != "ArrowDown" &&
              e.key != "ArrowRight" &&
              e.key != "ArrowLeft"
            ) {
              field.onChange(Number((e.target as HTMLInputElement).value));
            } else {
              e.preventDefault();
            }
          }}
          placeholder={`${item.placeholder ? item.placeholder : ""}`}
          minLength={item.minInput}
          maxLength={item.maxInput}
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
}
