import * as React from "react";
import {
  inputTypesDiffDynamic,
  SelectOptionsDynamic,
} from "../../utils/sample";
import Select from "react-select";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useWatch,
} from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

type SelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: inputTypesDiffDynamic;
  control?: string | SelectOptionsDynamic | SelectOptionsDynamic[] | any;
};

function SelectInput({
  item,
  field,
  fieldState,
  formState,
  control,
}: SelectProps) {

  if (item.type === "select") {
    return (
      <div className="position-relative">
        <Select
          {...field}
          onChange={(e) => {
            if (item.maxOptions && field.value.length < item.maxOptions) {
              field.onChange(e);
            } else if (!item.maxOptions) {
              field.onChange(e);
            } else if (
              item.maxOptions &&
              field.value.length >= item.maxOptions
            ) {
            }
          }}
          value={field.value}
          isDisabled={false}
          isLoading={false}
          isSearchable={true}
          options={item.options}
          isClearable
          isMulti={item.isMulti ? item.isMulti : false}
          onInputChange={item.inputchange ? item.inputchange : undefined}
          // className={fieldState.error ? "is-invalid" : ""}
        />
        {fieldState.error && <div
          className="position-absolute bottom-0"
          style={{ right: "43px", top: "5px" }}
        >
          <MdErrorOutline size={20} color="red" />
        </div>}
      </div>
    );
  } else if (item.type === "dependabledropdown") {
    const firstName = useWatch({
      control,
      name: item.previousSelect,
      defaultValue: field.value,
    });
    React.useEffect(() => {
      field.onChange("");
    }, [firstName]);
    return (
      <div className="position-relative">
        <Select
          {...field}
          onChange={(e) => {
            if (item.maxOptions && field.value?.length < item.maxOptions) {
              field.onChange(e);
            } else if (!item.maxOptions) {
              field.onChange(e);
            } else if (
              item.maxOptions &&
              field.value?.length >= item.maxOptions
            ) {
            }
          }}
          isMulti={item.isMulti ? item.isMulti : false}
          value={field.value}
          isDisabled={false}
          isLoading={false}
          isSearchable={true}
          options={item.options}
          isClearable
          onInputChange={item.inputchange ? item.inputchange : undefined}
          // className={`${errors[item.name]? 'css-art2ul-ValueContainer2 is-invalid': ''} w-100`}
        />
          {fieldState.error && <div
          className="position-absolute bottom-0"
          style={{ right: "43px", top: "5px" }}
        >
          <MdErrorOutline size={20} color="red" />
        </div>}
      </div>
    );
  }
}

export default SelectInput;
