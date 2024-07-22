import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaMicrophone, FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DependantDropdown from "./DependantDropdown";
import { AiOutlineClear } from "react-icons/ai";
import { BsFloppy } from "react-icons/bs";
import { FileBifercation } from "./FileBifercation";
import { IoMdCloudUpload } from "react-icons/io";
import { MultiItemForm } from "./MultiAddRemove";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  value?: any;
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

export interface SelectOptions {
  label: string;
  value: string;
}

export interface CheckBoxOptions {
  label: JSX.Element | string;
}

type FileTypes = Inputfields & {
  type: "file";
  isMulti: boolean;
  isPreview: boolean;
  maxFile?: number;
  uploadBtn?: JSX.Element | string;
  accept?: string;
  clearable: boolean;
  square: boolean;
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
  | FormArray
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
  submitFormBtn?: JSX.Element;
  resetFormBtn?: JSX.Element;
};

type FormArray = Inputfields & {
  type: "arrayform";
  details: inputTypesDiff[];
  arrayformclass?: string;
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
    resetFormBtn,
    submitFormBtn,
  } = props;
  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const formArrayDetail = formDetails.filter((item) => {
    if (item.type === "arrayform") {
      return item;
    }
  });

  let arrayName = "Array";

  let multiArrayObj = {};

  if (formArrayDetail.length > 0 && formArrayDetail[0].type === "arrayform") {
    arrayName = formArrayDetail[0].name;
    let updateObj: { [key: string]: any } = {};
    for (const item of formArrayDetail[0].details) {
      updateObj[`${item.name}`] = "";
    }
    multiArrayObj = updateObj;
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const allFormData = watch();

  formValues(allFormData);

  const selectOptions = formDetails.filter((item) => {
    if (item.type === "dependabledropdown") {
      return item;
    }
  });

  let previousData: any;
  if (
    selectOptions.length > 0 &&
    selectOptions[0].type === "dependabledropdown"
  ) {
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

  React.useEffect(() => {
    if (formDetails.length > 0) {
      for (const inputDetails of formDetails) {
        if (inputDetails.value) {
          setValue(inputDetails.name, inputDetails.value);
        }
      }
    }
  }, [formDetails]);

  function handleDragOver(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(handleDragOver, "handleDragOver");
  }

  function handleDrop(event: React.DragEvent, propertyName: string) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setValue(propertyName, files);
  }

  function updateFileForm(propertyname: string, valueFile: any) {
    setValue(propertyname, valueFile);
  }

  function fileUploadEvent(
    event: React.ChangeEvent<HTMLInputElement>,
    propertyname: string
  ) {
    setValue(propertyname, event.target.files);
  }

  function formArrayUpdate(indexOfForm:number,propertyname: string, details: object,) {
    setValue(`${propertyname}.${indexOfForm}`,{...details})
  }

  console.log(arrayName, "arrayName", multiArrayObj, "multiArrayObj");
  const [record, setRecord] = React.useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const btnPressed = () => {
    resetTranscript()
    // toast("btn Pressed");
    SpeechRecognition.startListening({continuous: true});
    setRecord(true);
  };
  const btnReleased = () => {
    setRecord(false);
    SpeechRecognition.stopListening();
  };
  React.useEffect(() => {
    if(record){
      setValue("voicetext", transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
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
                key={indexOfForm}
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
                                onKeyUp={(e) => {
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
                              onKeyUp={(e) => {
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
                                onKeyUp={(e) => {
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
                              onKeyUp={(e) => {
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
                                return (
                                  <div
                                    className={`form-check ${
                                      item.placeForLabel
                                        ? "form-check-inline"
                                        : ""
                                    }`}
                                    key={`radio-${index + 1}`}
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
                                      checked={
                                        radioOption.value ===
                                        allFormData[field.name]
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
                                return (
                                  <div
                                    className={`form-check `}
                                    key={`checkbox-${index + 1}`}
                                  >
                                    <input
                                      className={`form-check-input`}
                                      type="checkbox"
                                      // value={`${field.value}`}
                                      {...field}
                                      id={`checkbox${index}${indexOfForm}`}
                                      onChange={(e) =>
                                        setValue(field.name, e.target.checked)
                                      }
                                      checked={allFormData[field.name]}
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
                    <div
                      className="col-12 col-md-12"
                      onDragOver={handleDragOver}
                      onDrop={(eve) => handleDrop(eve, item.name)}
                    >
                      {item.isPreview &&
                        allFormData[item.name] &&
                        !item.square && (
                          <FileBifercation
                            UpdteValue={updateFileForm}
                            PropertyName={item.name}
                            clearable={item.clearable}
                            SortCategory={allFormData[item.name]}
                          />
                        )}
                      {(!allFormData[item.name] ||
                        allFormData[item.name]?.length == 0) &&
                        !item.square && (
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
                                // {...field}
                                onChange={(eve) =>
                                  fileUploadEvent(eve, field.name)
                                }
                                accept={item.accept}
                                className={`${
                                  errors[item.name] ? "is-invalid" : ""
                                } ${
                                  item.classinput
                                    ? item.classinput
                                    : "form-control"
                                }`}
                              />
                            )}
                          />
                        )}
                      {item.square && (
                        <>
                          {item.isPreview && allFormData[item.name] && (
                            <FileBifercation
                              UpdteValue={updateFileForm}
                              PropertyName={item.name}
                              clearable={item.clearable}
                              SortCategory={allFormData[item.name]}
                            />
                          )}
                          {(!allFormData[item.name] ||
                            allFormData[item.name]?.length == 0) && (
                            <div
                              className={`border-dashed rounded text-center border-secondary ${
                                item.classinput ? item.classinput : ""
                              }`}
                            >
                              <label
                                className="w-100 py-3"
                                htmlFor={`file-input${indexOfForm}`}
                              >
                                <IoMdCloudUpload size={150} color="#006FAC" />
                                <p>Drag & drop your files here</p>
                              </label>
                              <input
                                type="file"
                                hidden
                                accept={item.accept}
                                onChange={(eve) =>
                                  fileUploadEvent(eve, item.name)
                                }
                                id={`file-input${indexOfForm}`}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {item.type === "arrayform" && (
                    <div>
                      <div
                        className={`${
                          item.arrayformclass ? item.arrayformclass : `row mb-2`
                        }`}
                      >
                        {fields.map((field, formIndexArray) => {
                          console.log(
                            field,
                            "field",
                            formIndexArray,
                            "formIndexArray"
                          );
                          return (
                            //     <p>Lorem ipsum dolor sit amet.</p>
                            //   )

                            // }

                            // (
                            <>
                              <MultiItemForm
                                key={field.id}
                                control={control}
                                update={formArrayUpdate}
                                index={formIndexArray}
                                value={field}
                                details={item.details}
                                formClass = {item.arrayformclass}
                                remove= {remove}
                                propertyName = {item.name}
                              />
                            </>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        className={"btn btn-primary" + ``}
                        onClick={() => append(multiArrayObj)}
                      >
                        <FaPlus /> Add
                      </button>
                    </div>
                  )}

                  {item.type === "arrayform" &&
                     <div className="position-relative">
                      <Controller
                            name={'voicetext'}
                            control={control}
                            rules={{
                              ...item.validationobj,
                            }}
                            render={({ field }) => (
                              <input
                                type="text"
                                className="form-control rounded-pill py-2"
                              />
                            )}
                          />
                     <div className="position-absolute end-0 top-0 bottom-0"    onMouseDown={btnPressed}
                       onMouseUp={btnReleased}>
                       <button type="button" className="btn btn-success rounded-circle">
                         <FaMicrophone />
                       </button>
                     </div>
                   </div>
                  }

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
            <button type="submit" className="btn btn-outline-primary me-2">
              {!submitFormBtn && (
                <>
                  <i className="me-2">
                    <BsFloppy />
                  </i>
                  Submit
                </>
              )}
              {submitFormBtn && <>{submitFormBtn}</>}
            </button>
            {resetbtn && !resetFormBtn && (
              <button
                type="reset"
                className="ms-2 btn btn-outline-danger"
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
                {/* <i className="me-2">
                  <AiOutlineClear />
                </i> */}
                Reset
              </button>
            )}
            {resetbtn && resetFormBtn && (
              <button
                type="reset"
                className="ms-2 btn btn-outline-danger"
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
                {resetFormBtn}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export { CustomForm };
