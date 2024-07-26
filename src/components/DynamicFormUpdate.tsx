import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaMicrophone, FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DependantDropdown from "./DependantDropdown";
// import { AiOutlineClear } from "react-icons/ai";
import { BsFloppy } from "react-icons/bs";
import { MultiItemForm } from "./MultiAddRemove";
import {
  CheckBoxOptionsDynamic,
  inputTypesDiffDynamic,
  SelectOptionsDynamic,
} from "../utils/sample";
const EmailInput= React.lazy(() => import( "./formInputs/EmailInput"));
const FloatNumberInput= React.lazy(() => import( "./formInputs/FloatNumberInput"));
const SecureInput= React.lazy(() => import( "./formInputs/SecureInput"));
const PasswordInput= React.lazy(() => import( "./formInputs/PasswordInput"));
const RadioInput= React.lazy(() => import( "./formInputs/RadioInput"));
const CheckBoxInput= React.lazy(() => import( "./formInputs/CheckBoxInput"));
const FileInput= React.lazy(() => import( "./formInputs/FileInput"));
// import VoiceInput from "./VoiceInput";
const VoiceInput = React.lazy(() => import("./formInputs/VoiceInput"));
const NumberInput = React.lazy(() => import("./formInputs/NumberInput"));
const TextInput = React.lazy(() => import("./formInputs/TextInput"));

type FormInput = {
  submitfn: (params: object) => void;
  // dependableAsync?: boolean;
  formclass?: string;
  formTitle?: string;
  titlePosition?: "start" | "center" | "end";
  titleClass?: string | unknown;
  formDetails: inputTypesDiffDynamic[];
  formValues: (params: object) => void;
  resetbtn?: boolean;
  btnPosition?: "start" | "center" | "end";
  inputSideClass?: string;
  extendForm?: JSX.Element;
  submitFormBtn?: JSX.Element;
  resetFormBtn?: JSX.Element;
};

function FormDynamic(props: FormInput) {
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

  function formArrayUpdate(
    indexOfForm: number,
    propertyname: string,
    details: object
  ) {
    const detailForm = allFormData[propertyname][indexOfForm];
    const myUpdateValue = { ...detailForm, ...details };
    setValue(`${propertyname}.${indexOfForm}`, { ...myUpdateValue });
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
        <form className={`${formclass ? formclass : "row row-cols-1"} g-2`}>
          {formDetails.map(
            (item: inputTypesDiffDynamic, indexOfForm: number) => {
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

                  {item.type == "text" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <TextInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "email" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <EmailInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "number" && (
                    <Controller
                      name={`${item.name}`}
                      control={control}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <NumberInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "float" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <FloatNumberInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "password" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <PasswordInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "secure" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <SecureInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "radio" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <RadioInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type == "checkbox" && (
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <CheckBoxInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                        </React.Suspense>
                      )}
                    />
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
                    <Controller
                      name={item.name}
                      control={control}
                      rules={{
                        ...item.validationobj,
                      }}
                      render={({ field, fieldState, formState }) => (
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <FileInput
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            item={item}
                          />
                          {fieldState.error && (
                            <div className="form-text text-danger">
                              {fieldState.error.message}
                            </div>
                          )}
                        </React.Suspense>
                      )}
                    />
                  )}

                  {item.type === "arrayform" && (
                    <div>
                      <div
                        className={`${
                          item.arrayformclass ? item.arrayformclass : `row mb-2`
                        }`}
                      >
                        {fields.map((field, formIndexArray) => {
                          return (
                            <MultiItemForm
                              key={field.id}
                              update={formArrayUpdate}
                              index={formIndexArray}
                              value={field}
                              details={item.details}
                              formClass={item.arrayformclass}
                              remove={remove}
                              propertyName={item.name}
                              valueofForm={
                                allFormData[item.name][formIndexArray]
                              }
                            />
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
              );
            }
          )}
          {extendForm && extendForm}
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
            <button
              type="submit"
              className="btn btn-outline-primary me-2"
              onClick={handleSubmit(submitfn)}
            >
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
                    (item: inputTypesDiffDynamic) => {
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
                    (item: inputTypesDiffDynamic) => {
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
                Reset
              </button>
            )}
            {resetbtn && resetFormBtn && (
              <button
                type="reset"
                className="ms-2 btn btn-outline-danger"
                onClick={() => {
                  const dropDowns = formDetails.filter(
                    (item: inputTypesDiffDynamic) => {
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
                    (item: inputTypesDiffDynamic) => {
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

export {
  FormDynamic,
  CheckBoxOptionsDynamic,
  inputTypesDiffDynamic,
  SelectOptionsDynamic,
};
