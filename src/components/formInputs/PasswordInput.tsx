import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { inputTypesDiffDynamic } from "../../utils/sample";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type TextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

function PasswordInput({ item, field, fieldState, formState }: TextProps) {
  if (item.type === "password") {
    const [showPassword, setShowPassword] = React.useState(false);
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
        {!showPassword && (
          <input
            type={"password"}
            value={formValue}
            name={field.name}
            className={`${
              fieldState.error
                ? "is-invalid"
                : item.successValidation && formState.isValid
                ? "is-valid"
                : ""
            } ${item.classinput ? item.classinput : "form-control"}`}
            minLength={item.minInput}
            maxLength={item.maxInput}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            placeholder={`${item.placeholder ? item.placeholder : ""}`}
            autoComplete="off"
          />
        )}
        {showPassword && (
          <input
            type={"text"}
            value={formValue}
            name={field.name}
            minLength={item.minInput}
            maxLength={item.maxInput}
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
          />
        )}
        {!showPassword && (
          <div
            className="input-group-text"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaRegEye />
          </div>
        )}
        {showPassword && (
          <div
            className="input-group-text"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaRegEyeSlash />
          </div>
        )}
        {fieldState.error && (
          <div className="invalid-feedback">
            {fieldState.error?.message as React.ReactNode}
          </div>
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
      </div>
    );
  }
}

export default PasswordInput;
