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
  useForm,
  UseFormStateReturn,
  useWatch,
} from "react-hook-form";

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
  console.log(field.value, `value of ${item.type}`);

  if (item.type === "select") {
    return (
      <>
        <Select
          {...field}
          onChange={(e) => {
            // console.log(e,'e select Input');
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
          // className={`${errors[item.name]? 'css-art2ul-ValueContainer2 is-invalid': ''} w-100`}
        />
      </>
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
      <>
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
      </>
    );
  }
  console.log(item, "item");
}

export default SelectInput;
