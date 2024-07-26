import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import {
  CheckBoxOptionsDynamic,
  inputTypesDiffDynamic,
} from "../../utils/sample";

type TextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
};

function CheckBoxInput({ item, field, fieldState, formState }: TextProps) {
  if (item.type === "checkbox") {
    return (
      <div className={`col-12 ${item.classinput ? item.classinput : ""}`}>
        {item.options.map(
          (checkboxOption: CheckBoxOptionsDynamic, index: number) => {
            console.log(`checkbox-${field.name}-${index}`,index);            
            return (
              <div className={`form-check `} key={`checkbox-${index + 1}`}>
                <input
                  className={`form-check-input`}
                  type="checkbox"
                  {...field}
                  id={`checkbox-${field.name}-${index}`}
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox-${field.name}-${index}`}
                >
                  {checkboxOption.label}
                </label>

                {fieldState.error && (
                  <div className="invalid-feedback">
                    {fieldState.error?.message as React.ReactNode}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default CheckBoxInput;
