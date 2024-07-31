import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { inputTypesDiffDynamic } from "../../utils/sample";

type TextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

function EmailInput({ item, field, fieldState, formState }: TextProps) {
  if (item.type === 'email') {
    const [formValue, setFormValue] = React.useState(field.value);
    React.useEffect(() => {
      if (!field.value) {
        setFormValue("");
      } else {
        setFormValue(field.value);
      }
    }, [field.value]);
    return (
      <div className="input-group">
        {item.leftplaceText && (
          <div
            className={`input-group-text ${item.leftClass ? item.leftClass : ""}`}
          >
            {item.leftplaceText}
          </div>
        )}
        <input
          type={"email"}
          value={formValue}
          name={field.name}
          minLength={item.minInput}
          maxLength={item.maxInput}
          className={`${fieldState.error
              ? "is-invalid"
              : item.successValidation && formState.isValid
                ? "is-valid"
                : ""
            } ${item.classinput ? item.classinput : "form-control"}`}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          placeholder={`${item.placeholder ? item.placeholder : ""}`}
        />

        {item.rightplaceText && (
          <div
            className={`input-group-text ${item.rightClass ? item.rightClass : ""
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

export default EmailInput;
