import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DependantDropdown from "./DependantDropdown";
import { AiOutlineClear } from "react-icons/ai";
import { BsFloppy } from "react-icons/bs";
import { FileBifercation } from "./FileBifercation";

type Inputfields = {
  lable?: string | JSX.Element;
  lableClass?: string;
  placeholder?: string;
  validation?: boolean;
  rightplaceText?: string | JSX.Element;
  leftplaceText?: string | JSX.Element;
  rightClass?: string;
  leftClass?: string;
  classinput?: string;
  maininputclass?: string;
  validationobj?: object;
  name: string;
  defaultvalue?: string;
  somemsg?: string | JSX.Element;
};

type InputOptionList = Inputfields & {
  type:
    | "text"
    | "search"
    | "textarea"
    | "number"
    | "float"
    | "telephone"
    | "password"
    | "email"
    | "searchoption"
    | "arrayform"
    | "secure"
    | "switch";
};

type RadioFields = Inputfields & {
  type: "radio";
  placeForLabel: "inline" | "new line";
  radioOptions: SelectOptions[];
};

type CheckboxFields = Inputfields & {
  type: "checkbox";
  options: [CheckBoxOptions];
};

type SelectAsync = Inputfields & {
  type: "select";
  options: SelectOptions[];
  defaultvalue?: string | SelectOptions;
  isMulti: boolean;
  maxOptions: number;
  inputchange?: (data: string) => {};
  url: string;
  createable?: boolean;
  optionPromise: () => void;
  // Promise<SelectOptions[]>
};

type SelectDependable = Inputfields & {
  type: "dependabledropdown";
  url?: string;
  previousSelect: string;
  options: SelectOptions[];
  isMulti: boolean;
  maxOptions: number;
  inputchange?: (data: string) => {};
  optionPromise: () => void;
};

interface SelectOptions {
  label: string;
  value: string;
}

interface CheckBoxOptions {
  label: JSX.Element | string;
}

type FileTypes = Inputfields & {
  type: "file";
  isMulti: boolean;
  isPreview: boolean;
  maxFile?: number;
  uploadBtn: JSX.Element | string;
  accept: string;
  clearable: boolean;
};

export type formdetailfull = [
  | RadioFields
  | SelectAsync
  | SelectDependable
  | CheckboxFields
  | FileTypes
  | InputOptionList
];

export type inputTypesDiff =
  | RadioFields
  | SelectAsync
  | SelectDependable
  | CheckboxFields
  | FileTypes
  | InputOptionList;

type FormInput = {
  submitfn: (params: object) => void;
  // dependableAsync?: boolean;
  formclass?: string;
  formTitle?: string;
  titlePosition?: "start" | "center" | "end";
  titleClass?: string | unknown;
  formDetails: inputTypesDiff[];
  formValues: (params: object) => void;
  resetbtn?: boolean;
  btnPosition?: "start" | "center" | "end";
  inputSideClass?: string;
  extendForm?: JSX.Element;
};

function CustomForm(props: FormInput) {
  const {
    formTitle,
    titlePosition,
    titleClass,
    submitfn,
    formDetails,
    formclass,
    formValues,
    resetbtn,
    btnPosition,
    inputSideClass,
    extendForm,
  } = props;
  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const allFormData = watch();

  formValues(allFormData);

  const selectOptions: any = formDetails.filter((item) => {
    if (item.type == "dependabledropdown") {
      return item;
    }
  });

  let previousData: any;
  if (selectOptions.length > 0) {
    previousData = watch(selectOptions[0]?.previousSelect);
  }

  React.useEffect(() => {
    if (selectOptions.length > 0) {
      const dropDownDependent = watch(selectOptions[0].name);
      if (dropDownDependent) {
        setValue(selectOptions[0].name, "");
      }
    }
  }, [previousData]);

  function handleDragOver(event: any,) {
    console.log(event, "handleDragOver");
    event.preventDefault();
    // const files = event.dataTransfer.files;
  }

  function handleDrop(event: React.DragEvent,propertyName:string) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setValue(propertyName,files)
    console.log(files, "handleDrop", event.dataTransfer);
    // // Process the dropped files
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
      const preview = URL.createObjectURL(files[i])
      console.log(preview,'previewURL');      
    }
  }

  function updateFileForm(propertyname: string,valueFile:any){
    setValue(propertyname,valueFile)
  }
  
  return (
    <div>
      <div className="row">
        {formTitle && (
          <h1
            className={`${
              titlePosition === "center"
                ? `text-center`
                : titlePosition === "start"
                ? `text-start`
                : titlePosition === "end"
                ? `text-end`
                : titleClass
                ? titleClass
                : ""
            }`}
          >
            {formTitle}
          </h1>
        )}
        <form
          onSubmit={handleSubmit(submitfn)}
          className={`${formclass ? formclass : "row row-cols-1"} g-2`}
        >
          {formDetails.map((item: inputTypesDiff, indexOfForm: number) => {
            return (
              <div
                className={` ${
                  item.maininputclass ? item.maininputclass : "col"
                }`}
                id={`formInput-${indexOfForm}`}
              >
                {item.lable && (
                  <label
                    className={`form-label ${
                      item.lableClass ? item.lableClass : ""
                    }`}
                  >
                    {typeof item.lable === "string" && item.lable
                      ? item.lable?.split(/\*/)[0]
                      : item.lable}
                    <span className="text-danger">
                      {typeof item.lable === "string" &&
                      item.lable?.split(/\*/)?.length > 1
                        ? "*"
                        : ""}
                    </span>
                  </label>
                )}
                {/* {item.type == "text" && <input type={item.type} {...register(item.name,{ ...item.validationobj })} className={`form-control `} />} */}
                <div className={`${inputSideClass ? inputSideClass : `w-100`}`}>
                  {item.type == "text" && (
                    <>
                      {(item.leftplaceText || item.rightplaceText) && (
                        <div className="input-group">
                          {item.leftplaceText && (
                            <div
                              className={`input-group-text ${
                                item.leftClass ? item.leftClass : ""
                              }`}
                            >
                              {item.leftplaceText}
                            </div>
                          )}
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <input
                                type={item.type}
                                {...field}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                                placeholder={`${
                                  item.placeholder ? item.placeholder : ""
                                }`}
                              />
                            )}
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
                        </div>
                      )}
                      {!item.rightplaceText && !item.leftplaceText && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <input
                              type={item.type}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
                            />
                          )}
                        />
                      )}
                    </>
                  )}

                  {item.type == "email" && (
                    <>
                      {(item.leftplaceText || item.rightplaceText) && (
                        <div className="input-group">
                          {item.leftplaceText && (
                            <div
                              className={`input-group-text ${
                                item.leftClass ? item.leftClass : ""
                              }`}
                            >
                              {item.leftplaceText}
                            </div>
                          )}
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <input
                                type={item.type}
                                {...field}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                                placeholder={`${
                                  item.placeholder ? item.placeholder : ""
                                }`}
                              />
                            )}
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
                        </div>
                      )}
                      {!item.rightplaceText && !item.leftplaceText && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <input
                              type={item.type}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
                            />
                          )}
                        />
                      )}
                    </>
                  )}

                  {item.type == "number" && (
                    <>
                      {(item.leftplaceText || item.rightplaceText) && (
                        <div className="input-group">
                          {item.leftplaceText && (
                            <div
                              className={`input-group-text ${
                                item.leftClass ? item.leftClass : ""
                              }`}
                            >
                              {item.leftplaceText}
                            </div>
                          )}
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <input
                                type={item.type}
                                {...field}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                                onKeyDown={(e) => {
                                  if (
                                    e.key != "ArrowUp" &&
                                    e.key != "ArrowDown" &&
                                    e.key != "ArrowRight" &&
                                    e.key != "ArrowLeft"
                                  ) {
                                    setValue(field.name, Number(field.value));
                                  } else {
                                    e.preventDefault();
                                  }
                                }}
                                placeholder={`${
                                  item.placeholder ? item.placeholder : ""
                                }`}
                              />
                            )}
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
                        </div>
                      )}
                      {!item.rightplaceText && !item.leftplaceText && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <input
                              type={item.type}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              onKeyDown={(e) => {
                                if (
                                  e.key != "ArrowUp" &&
                                  e.key != "ArrowDown" &&
                                  e.key != "ArrowRight" &&
                                  e.key != "ArrowLeft"
                                ) {
                                  setValue(field.name, field.value);
                                } else {
                                  e.preventDefault();
                                }
                              }}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
                            />
                          )}
                        />
                      )}
                    </>
                  )}

                  {item.type == "float" && (
                    <>
                      {(item.leftplaceText || item.rightplaceText) && (
                        <div className="input-group">
                          {item.leftplaceText && (
                            <div
                              className={`input-group-text ${
                                item.leftClass ? item.leftClass : ""
                              }`}
                            >
                              {item.leftplaceText}
                            </div>
                          )}
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <input
                                type={item.type}
                                step={"0.01"}
                                {...field}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                                onKeyDown={(e) => {
                                  if (
                                    e.key != "ArrowUp" &&
                                    e.key != "ArrowDown" &&
                                    e.key != "ArrowRight" &&
                                    e.key != "ArrowLeft"
                                  ) {
                                    setValue(field.name, Number(field.value));
                                  } else {
                                    e.preventDefault();
                                  }
                                }}
                                placeholder={`${
                                  item.placeholder ? item.placeholder : ""
                                }`}
                              />
                            )}
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
                        </div>
                      )}
                      {!item.rightplaceText && !item.leftplaceText && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <input
                              type={item.type}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              onKeyDown={(e) => {
                                if (
                                  e.key != "ArrowUp" &&
                                  e.key != "ArrowDown" &&
                                  e.key != "ArrowRight" &&
                                  e.key != "ArrowLeft"
                                ) {
                                  setValue(field.name, field.value);
                                } else {
                                  e.preventDefault();
                                }
                              }}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
                            />
                          )}
                        />
                      )}
                    </>
                  )}

                  {item.type == "password" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field }) => (
                        <div className="input-group">
                          {!showPassword && (
                            <input
                              type={item.type}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
                            />
                          )}
                          {showPassword && (
                            <input
                              type={"text"}
                              {...field}
                              className={`${
                                errors[item.name] ? "is-invalid" : ""
                              } ${
                                item.classinput
                                  ? item.classinput
                                  : "form-control"
                              }`}
                              placeholder={`${
                                item.placeholder ? item.placeholder : ""
                              }`}
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
                          {errors[item.name] && (
                            <div className="invalid-feedback">
                              {errors[item.name]?.message as React.ReactNode}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  )}

                  {item.type == "secure" && (
                    <>
                      {(item.leftplaceText || item.rightplaceText) && (
                        <div className="input-group">
                          {item.leftplaceText && (
                            <div
                              className={`input-group-text ${
                                item.leftClass ? item.leftClass : ""
                              }`}
                            >
                              {item.leftplaceText}
                            </div>
                          )}
                          <Controller
                            name={item.name}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <div className="input-group">
                                <input
                                  type={"password"}
                                  {...field}
                                  className={`${
                                    errors[item.name] ? "is-invalid" : ""
                                  } ${
                                    item.classinput
                                      ? item.classinput
                                      : "form-control"
                                  }`}
                                  placeholder={`${
                                    item.placeholder ? item.placeholder : ""
                                  }`}
                                />
                                {errors[item.name] && (
                                  <div className="invalid-feedback">
                                    {
                                      errors[item.name]
                                        ?.message as React.ReactNode
                                    }
                                  </div>
                                )}
                              </div>
                            )}
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
                        </div>
                      )}
                      {!item.rightplaceText && !item.leftplaceText && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <div className="input-group">
                              <input
                                type={"password"}
                                {...field}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                                placeholder={`${
                                  item.placeholder ? item.placeholder : ""
                                }`}
                              />
                              {errors[item.name] && (
                                <div className="invalid-feedback">
                                  {
                                    errors[item.name]
                                      ?.message as React.ReactNode
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        />
                      )}
                    </>
                  )}

                  {/* {item.type == "textarea" && (
                    <div className={`form-control`}>
                      <Controller
                        name={item.name}
                        control={control}
                        rules={{
                          ...item.validationobj,
                        }}
                        render={({
                          field: { onChange, onBlur, ref, value },
                        }) => (
                          <CKEditor
                            editor={ClassicEditor}
                            // data="<p>Hello from CKEditor&nbsp;5!</p>"
                            data={value}
                            onChange={(event:any, editor:any) => {
                              const data = editor.getData();
                              onChange(data);
                            }}
                          />
                        )}
                      />
                    </div>
                  )} */}
                  {item.type == "radio" && (
                    <div className="col-12">
                      <Controller
                        name={item.name}
                        control={control}
                        rules={{
                          ...item.validationobj,
                        }}
                        render={({ field }) => (
                          <>
                            {item.radioOptions.map(
                              (radioOption: SelectOptions, index: number) => {
                                // console.log(radioOption, 'radioOption',field.name);

                                return (
                                  <div
                                    className={`form-check ${
                                      item.placeForLabel
                                        ? "form-check-inline"
                                        : ""
                                    }`}
                                  >
                                    <input
                                      className={`form-check-input`}
                                      type="radio"
                                      // value={`${field.value}`}
                                      {...field}
                                      id={`${radioOption.value} radio-${indexOfForm}${index}`}
                                      onChange={() =>
                                        setValue(field.name, radioOption.value)
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`${radioOption.value} radio-${indexOfForm}${index}`}
                                    >
                                      {radioOption.label}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                      />
                      {errors[item.name] && (
                        <div className="invalid-feedback d-block">
                          {errors[item.name]?.message as React.ReactNode}
                        </div>
                      )}
                    </div>
                  )}
                  {item.type == "checkbox" && (
                    <div
                      className={`col-12 ${
                        item.classinput ? item.classinput : ""
                      }`}
                    >
                      <Controller
                        name={item.name}
                        control={control}
                        rules={{
                          ...item.validationobj,
                        }}
                        render={({ field }) => (
                          <>
                            {item.options.map(
                              (
                                checkboxOption: CheckBoxOptions,
                                index: number
                              ) => {
                                // console.log(checkboxOption, 'checkboxOption',field.name);
                                return (
                                  <div className={`form-check `}>
                                    <input
                                      className={`form-check-input`}
                                      type="checkbox"
                                      // value={`${field.value}`}
                                      {...field}
                                      id={`checkbox${index}${indexOfForm}`}
                                      onChange={(e) =>
                                        setValue(field.name, e.target.checked)
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`checkbox${index}`}
                                    >
                                      {checkboxOption.label}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                      />
                      {errors[item.name] && (
                        <div className="invalid-feedback d-block">
                          {errors[item.name]?.message as React.ReactNode}
                        </div>
                      )}
                    </div>
                  )}
                  {item.type == "select" && (
                    <div className="col ">
                      {!item.url && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isDisabled={false}
                              isLoading={false}
                              isSearchable={true}
                              options={item.options}
                              isClearable
                              onInputChange={
                                item.inputchange ? item.inputchange : undefined
                              }
                              // className={`${errors[item.name]? 'css-art2ul-ValueContainer2 is-invalid': ''} w-100`}
                            />
                          )}
                        />
                      )}
                      {item.url && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <AsyncSelect
                              cacheOptions
                              defaultOptions
                              isSearchable={true}
                              value={field.value}
                              onChange={(newValue) => {
                                field.onChange(newValue);
                              }}
                              onInputChange={
                                item.inputchange ? item.inputchange : () => {}
                              }
                              loadOptions={item.optionPromise}
                              isClearable
                            />
                          )}
                        />
                      )}
                      {errors[item.name] && (
                        <div className="invalid-feedback d-block">
                          {errors[item.name]?.message as React.ReactNode}
                        </div>
                      )}
                    </div>
                  )}
                  {item.type == "dependabledropdown" && (
                    <div className="col">
                      {!item.url && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isDisabled={false}
                              isLoading={false}
                              onInputChange={
                                item.inputchange ? item.inputchange : () => {}
                              }
                              isSearchable={true}
                            />
                          )}
                        />
                      )}
                      {item.url && (
                        <Controller
                          name={item.name}
                          control={control}
                          rules={{
                            ...item.validationobj,
                          }}
                          render={({ field }) => (
                            <DependantDropdown
                              {...field}
                              dependData={previousData}
                              dependUrl={item.url}
                              onInputChange={
                                item.inputchange ? item.inputchange : () => {}
                              }
                              maxOptions={item?.maxOptions}
                            />
                          )}
                        />
                      )}
                      {errors[item.name] && (
                        <div className="invalid-feedback d-block">
                          {errors[item.name]?.message as React.ReactNode}
                        </div>
                      )}
                    </div>
                  )}
                  {item.type == "file" && (
                    <div className="col-12 col-md-12"  onDragOver={handleDragOver}
                    onDrop={(eve)=>handleDrop(eve,item.name)}>
                      {
                        item.isPreview && allFormData[item.name] && (
                          <FileBifercation UpdteValue={updateFileForm} PropertyName={item.name} clearable={true} SortCategory={allFormData[item.name]} />
                        )
                      }
                      <Controller
                        name={item.name}
                        control={control}
                        rules={{
                          ...item.validationobj,
                        }}
                        render={({ field }) => (
                          <input
                            type="file"
                            multiple={item.isMulti}
                            {...field}
                            accept={item.accept}
                            className={`${
                              errors[item.name] ? "is-invalid" : ""
                            } ${
                              item.classinput ? item.classinput : "form-control"
                            }`}
                          />
                        )}
                      />
                    </div>
                  )}

                  {errors[item.name] &&
                    item.type !== "password" &&
                    item.type !== "radio" &&
                    item.type !== "checkbox" && (
                      <div className="invalid-feedback">
                        {errors[item.name]?.message as React.ReactNode}
                      </div>
                    )}
                  {item.somemsg && (
                    <div className="form-text">{item.somemsg}</div>
                  )}
                </div>
              </div>
            );
          })}
          {extendForm}
          <div
            className={`mt-3 col-12 col-md-12
            ${
              btnPosition === "start"
                ? "text-start"
                : btnPosition === "center"
                ? "text-center"
                : btnPosition === "end"
                ? "text-end"
                : "text-center"
            } `}
          >
            <button type="submit" className="btn btn-primary me-2">
              <i className="me-2">
                <BsFloppy />
              </i>
              Submit
            </button>
            {resetbtn && (
              <button
                type="reset"
                className="ms-2 btn btn-danger"
                onClick={() => {
                  const dropDowns = formDetails.filter(
                    (item: inputTypesDiff) => {
                      if (item.type === "select") {
                        return item;
                      }
                    }
                  );

                  if (dropDowns.length > 0) {
                    for (const dropItem of dropDowns) {
                      reset({ [dropItem.name]: "select..." });
                    }
                  }

                  const textAreaList = formDetails.filter(
                    (item: inputTypesDiff) => {
                      if (item.type === "textarea") {
                        return item;
                      }
                    }
                  );

                  if (textAreaList.length > 0) {
                    for (const iterator of textAreaList) {
                      reset({ [iterator.name]: "<p></p>" });
                    }
                  }

                  reset();
                }}
              >
                <i className="me-2">
                  <AiOutlineClear />
                </i>
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export { CustomForm };
