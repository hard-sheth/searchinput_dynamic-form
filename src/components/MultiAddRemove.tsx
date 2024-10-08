import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DependantDropdown from "./DependantDropdown";
import { CheckBoxOptions, inputTypesDiff, SelectOptions } from "./CustomForm";
import { FileBifercation } from "./FileBifercation";
import { IoMdCloudUpload } from "react-icons/io";

type ArrayForm = {
  update?: any;
  index: number;
  value: any;
  details: inputTypesDiff[];
  formClass?: string;
  remove: any;
  propertyName: string;
  valueofForm: any;
};

function MultiItemForm({
  update,
  index,
  value,
  details,
  formClass,
  remove,
  propertyName,
  valueofForm
}: ArrayForm) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: value,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  function handleDragOver(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
  }

  function handleDrop(event: React.DragEvent, prop__name: string) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setValue(prop__name, files);
    update(index, propertyName, { [prop__name]: files });
  }

  function fileUploadEvent(
    event: React.ChangeEvent<HTMLInputElement>,
    prop__name: string
  ) {
    setValue(prop__name, event.target.files);
    update(index, propertyName, { [prop__name]: event.target.files });
  }

  function updateFileForm(prop__name: string, valueFile: any) {
    setValue(prop__name, valueFile);
    update(index, propertyName, { [prop__name]: valueFile });
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: eventvalue } = event.target;
    update(index, propertyName, { [name]: eventvalue }); // Update the field in the array in real-time
  };


  if (Object.keys(valueofForm).length > 0) {
    for (const formThing of Object.entries(valueofForm)) {
      setValue(formThing[0], formThing[1]);
    }
  }

  if (Object.values(valueofForm).length === 0) {
    for (const itemName of details) {
      setValue(itemName.name, '')
    }
  }

  return (
    <div className={`row position-relative py-3 ${formClass ? formClass : ''}`} >
      {details.map((item, indexOfForm: number) => {
        return (
          <div
            className={` ${item.maininputclass ? item.maininputclass : "col"}`}
            id={`ArrayformInput-${index}-${indexOfForm}`}
            key={indexOfForm}
          >
            {item.label && (
              <label
                className={`form-label ${item.labelClass ? item.labelClass : ""
                  }`}
              >
                {typeof item.label === "string" && item.label
                  ? item.label?.split(/\*/)[0]
                  : item.label}
                <span className="text-danger">
                  {typeof item.label === "string" &&
                    item.label?.split(/\*/)?.length > 1
                    ? "*"
                    : ""}
                </span>
              </label>
            )}

            {item.type == "text" && (
              <>
                {(item.leftplaceText || item.rightplaceText) && (
                  <div className="input-group">
                    {item.leftplaceText && (
                      <div
                        className={`input-group-text ${item.leftClass ? item.leftClass : ""
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
                      render={({ field, formState: { errors } }) => (
                        <input
                          type={item.type}
                          {...field}
                          className={`${errors[item.name] ? "is-invalid" : ""
                            } ${item.classinput ? item.classinput : "form-control"
                            }`}
                          placeholder={`${item.placeholder ? item.placeholder : ""
                            }`}
                        />
                      )}
                    />
                    {item.rightplaceText && (
                      <div
                        className={`input-group-text ${item.rightClass ? item.rightClass : ""
                          }`}
                      >
                        {item.rightplaceText}
                      </div>
                    )}
                  </div>
                )}
                {!item.rightplaceText && !item.leftplaceText && (
                  <Controller
                    name={`${item.name}`}
                    control={control}
                    rules={{
                      ...item.validationobj,
                    }}
                    render={({ field, formState: { errors } }) => (
                      <input
                        type={item.type}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        placeholder={`${item.placeholder ? item.placeholder : ""
                          }`}
                        onChange={handleInputChange}
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
                        className={`input-group-text ${item.leftClass ? item.leftClass : ""
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
                      render={({ field, formState: { errors } }) => (
                        <input
                          type={item.type}
                          {...field}
                          className={`${errors[item.name] ? "is-invalid" : ""
                            } ${item.classinput ? item.classinput : "form-control"
                            }`}
                          placeholder={`${item.placeholder ? item.placeholder : ""
                            }`}
                          onChange={handleInputChange}
                        />
                      )}
                    />
                    {item.rightplaceText && (
                      <div
                        className={`input-group-text ${item.rightClass ? item.rightClass : ""
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
                    render={({ field, formState: { errors } }) => (
                      <input
                        type={item.type}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        placeholder={`${item.placeholder ? item.placeholder : ""
                          }`}
                        onChange={handleInputChange}
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
                        className={`input-group-text ${item.leftClass ? item.leftClass : ""
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
                      render={({ field, formState: { errors } }) => (
                        <input
                          type={item.type}
                          {...field}
                          className={`${errors[item.name] ? "is-invalid" : ""
                            } ${item.classinput ? item.classinput : "form-control"
                            }`}
                          onKeyUp={(e) => {
                            if (
                              e.key != "ArrowUp" &&
                              e.key != "ArrowDown" &&
                              e.key != "ArrowRight" &&
                              e.key != "ArrowLeft"
                            ) {
                              const keyName = item.name;
                              const keyValue = (e.target as HTMLInputElement).value;
                              update(index, propertyName, {
                                [keyName]: keyValue,
                              });
                            } else {
                              e.preventDefault();
                            }
                          }}
                          placeholder={`${item.placeholder ? item.placeholder : ""
                            }`}
                        />
                      )}
                    />
                    {item.rightplaceText && (
                      <div
                        className={`input-group-text ${item.rightClass ? item.rightClass : ""
                          }`}
                      >
                        {item.rightplaceText}
                      </div>
                    )}
                  </div>
                )}
                {!item.rightplaceText && !item.leftplaceText && (
                  <Controller
                    name={`${item.name}`}
                    control={control}
                    rules={{
                      ...item.validationobj,
                    }}
                    render={({ field, formState: { errors } }) => (
                      <input
                        type={item.type}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        onKeyUp={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (
                            e.key != "ArrowUp" &&
                            e.key != "ArrowDown" &&
                            e.key != "ArrowRight" &&
                            e.key != "ArrowLeft"
                          ) {
                            const keyName = item.name;
                            const keyValue = (e.target as HTMLInputElement).value;
                            update(index, propertyName, {
                              [keyName]: keyValue,
                            });
                          } else {
                            e.preventDefault();
                          }
                        }}
                        placeholder={`${item.placeholder ? item.placeholder : ""
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
                        className={`input-group-text ${item.leftClass ? item.leftClass : ""
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
                      render={({ field, formState: { errors } }) => (
                        <input
                          type={"number"}
                          step={"0.01"}
                          {...field}
                          className={`${errors[item.name] ? "is-invalid" : ""
                            } ${item.classinput ? item.classinput : "form-control"
                            }`}
                          onKeyUp={(e) => {
                            if (
                              e.key != "ArrowUp" &&
                              e.key != "ArrowDown" &&
                              e.key != "ArrowRight" &&
                              e.key != "ArrowLeft"
                            ) {
                              const keyName = item.name;
                              const keyValue = (e.target as HTMLInputElement).value;
                              update(index, propertyName, {
                                [keyName]: keyValue,
                              });
                            } else {
                              e.preventDefault();
                            }
                          }}
                          placeholder={`${item.placeholder ? item.placeholder : ""
                            }`}
                        />
                      )}
                    />
                    {item.rightplaceText && (
                      <div
                        className={`input-group-text ${item.rightClass ? item.rightClass : ""
                          }`}
                      >
                        {item.rightplaceText}
                      </div>
                    )}
                  </div>
                )}
                {!item.rightplaceText && !item.leftplaceText && (
                  <Controller
                    name={`${item.name}`}
                    control={control}
                    rules={{
                      ...item.validationobj,
                    }}
                    render={({ field, formState: { errors } }) => (
                      <input
                        type={"number"}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        onKeyUp={(e) => {
                          if (
                            e.key != "ArrowUp" &&
                            e.key != "ArrowDown" &&
                            e.key != "ArrowRight" &&
                            e.key != "ArrowLeft"
                          ) {
                            const keyName = item.name;
                            const keyValue = (e.target as HTMLInputElement).value;
                            update(index, propertyName, {
                              [keyName]: keyValue,
                            });
                          } else {
                            e.preventDefault();
                          }
                        }}
                        placeholder={`${item.placeholder ? item.placeholder : ""
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
                render={({ field, formState: { errors } }) => (
                  <div className="input-group">
                    {!showPassword && (
                      <input
                        type={item.type}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        placeholder={`${item.placeholder ? item.placeholder : ""
                          }`}
                        onChange={handleInputChange}
                      />
                    )}
                    {showPassword && (
                      <input
                        type={"text"}
                        {...field}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                        placeholder={`${item.placeholder ? item.placeholder : ""
                          }`}
                        onChange={handleInputChange}
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
                        className={`input-group-text ${item.leftClass ? item.leftClass : ""
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
                      render={({ field, formState: { errors } }) => (
                        <div className="input-group">
                          <input
                            type={"password"}
                            {...field}
                            className={`${errors[item.name] ? "is-invalid" : ""
                              } ${item.classinput ? item.classinput : "form-control"
                              }`}
                            onChange={handleInputChange}
                            placeholder={`${item.placeholder ? item.placeholder : ""
                              }`}
                          />
                          {errors[item.name] && (
                            <div className="invalid-feedback">
                              {errors[item.name]?.message as React.ReactNode}
                            </div>
                          )}
                        </div>
                      )}
                    />
                    {item.rightplaceText && (
                      <div
                        className={`input-group-text ${item.rightClass ? item.rightClass : ""
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
                    render={({ field, formState: { errors } }) => (
                      <div className="input-group">
                        <input
                          type={"password"}
                          {...field}
                          className={`${errors[item.name] ? "is-invalid" : ""
                            } ${item.classinput ? item.classinput : "form-control"
                            }`}
                          placeholder={`${item.placeholder ? item.placeholder : ""
                            }`}
                          onChange={handleInputChange}
                        />
                        {errors[item.name] && (
                          <div className="invalid-feedback">
                            {errors[item.name]?.message as React.ReactNode}
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
                  render={({ field, formState: { errors } }) => (
                    <>
                      {item.radioOptions.map(
                        (radioOption: SelectOptions, index: number) => {
                          return (
                            <div
                              className={`form-check ${item.placeForLabel ? "form-check-inline" : ""
                                }`}
                              key={`radio-${index + 1}`}
                            >
                              <input
                                className={`form-check-input`}
                                type="radio"
                                // value={`${field.value}`}
                                {...field}
                                id={`${radioOption.value} radio-${indexOfForm}${index}`}
                                onChange={() => {
                                  const keyName = item.name;
                                  const keyValue = radioOption.value;
                                  update(index, propertyName, { [keyName]: keyValue, });
                                }}
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
                className={`col-12 ${item.classinput ? item.classinput : ""}`}
              >
                <Controller
                  name={item.name}
                  control={control}
                  rules={{
                    ...item.validationobj,
                  }}
                  render={({ field, formState: { errors } }) => (
                    <>
                      {item.options.map(
                        (checkboxOption: CheckBoxOptions, index: number) => {
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
                                onChange={
                                  (e) => {
                                    const keyName = item.name;
                                    const keyValue = e.target.checked;
                                    update(index, item.name, { [keyName]: keyValue });
                                  }
                                  // setValue(field.name, e.target.checked)
                                }
                                checked={value[index][field.name]}
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
                    render={({ field, formState: { errors } }) => (
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
                      />
                    )}
                  />
                )}
                {item.url &&
                  <Controller
                    name={item.name}
                    control={control}
                    rules={{
                      ...item.validationobj,
                    }}
                    render={({ field, formState: { errors } }) => (
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        isSearchable={true}
                        value={field.value}

                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        onInputChange={
                          item.inputchange ? item.inputchange : () => { }
                        }
                        loadOptions={item.optionPromise}
                        isClearable
                      />
                    )}
                  />
                }
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
                onDrop={(eve) => handleDrop(eve, item.name)}>
                {item.isPreview && !item.square && (
                  <FileBifercation
                    UpdteValue={updateFileForm}
                    PropertyName={item.name}
                    clearable={item.clearable}
                    SortCategory={value[item.name]}
                  />
                )}
                {!item.square && (
                  <Controller
                    name={item.name}
                    control={control}
                    rules={{
                      ...item.validationobj,
                    }}
                    render={({ field, formState: { errors } }) => (
                      <input
                        type="file"
                        multiple={item.isMulti}
                        // {...field}
                        onChange={(eve) => fileUploadEvent(eve, field.name)}
                        accept={item.accept}
                        className={`${errors[item.name] ? "is-invalid" : ""} ${item.classinput ? item.classinput : "form-control"
                          }`}
                      />
                    )}
                  />
                )}
                {item.square && (
                  <>
                    {item.isPreview && value[index][item.name] && (
                      <FileBifercation
                        UpdteValue={updateFileForm}
                        PropertyName={item.name}
                        clearable={item.clearable}
                        SortCategory={value[item.name]}
                      />
                    )}
                    {(!value[index][item.name] ||
                      value[index][item.name]?.length == 0) && (
                        <div
                          className={`border-dashed rounded text-center border-secondary ${item.classinput ? item.classinput : ""
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
                            onChange={(eve) => fileUploadEvent(eve, item.name)}
                            id={`file-input${indexOfForm}`}
                          />
                        </div>
                      )}
                  </>
                )}
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

            {item.somemsg && <div className="form-text">{item.somemsg}</div>}
          </div>
        );
      })}
      <div className="position-absolute text-end">
        <button type="button" className="btn-close" aria-label="Close" onClick={() => remove(index)}></button>
      </div>
    </div>
  );
}

export { MultiItemForm };
