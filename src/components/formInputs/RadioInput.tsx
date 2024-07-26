import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import {
  inputTypesDiffDynamic,
  SelectOptionsDynamic,
} from "../../utils/sample";

type TextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

function RadioInput({ item, field, fieldState, formState }: TextProps) {
  if (item.type === "radio") {
    return (
      <div className="col-12">
        {item.radioOptions.map(
          (radioOption: SelectOptionsDynamic, index: number) => {
            return (
              <div
                className={`form-check ${
                  item.placeForLabel ? "form-check-inline" : ""
                }`}
                key={`radio-${index + 1}`}
              >
                <input
                  className={`form-check-input`}
                  type="radio"
                  {...field}
                  id={`${radioOption.value} radio-${field.name}${index}`}
                  onChange={() => field.onChange(radioOption.value)}
                  checked={radioOption.value === field.value}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${radioOption.value} radio-${field.name}${index}`}
                >
                  {radioOption.label}
                </label>
              </div>
            );
          }
        )}
        {fieldState.error && (
          <div className="invalid-feedback d-block">
            {fieldState.error?.message as React.ReactNode}
          </div>
        )}
      </div>
    );
  }
}

export default RadioInput;
