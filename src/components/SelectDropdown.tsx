import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import AsyncCreatebleSelect from "react-select/async-creatable";
import CreatableSelect from 'react-select/creatable';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { selectComponentProps, SelectOptions } from './SelectDropdownType';

function SlectDropdown(props: selectComponentProps) {
  const [selectedOptions, setSelectedOptions] = useState<SingleValue<SelectOptions> | MultiValue<SelectOptions>>(null);
  const [maxSelectError, setMaxSelectError] = useState(false)
  // Handle change in selection
  const handleChangeSelect = (
    newValue: SingleValue<SelectOptions> | MultiValue<SelectOptions>,
    actionMeta: ActionMeta<SelectOptions>
  ) => {
    if (props.isMulti) {
      if (typeof selectedOptions === 'object' && Array.isArray(selectedOptions)) {
        if (props.maxOptions) {
          if (selectedOptions.length <= props.maxOptions)
            setSelectedOptions(newValue); // Update state with the selected option(s)
        }
      }
    }
  };

  if (props.type === 'select' && !props.creatable) {
    const { options, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue, } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])

    return (
      <>
        <Select
          options={options}
          isClearable={clearable}
          isMulti={isMulti}
          isDisabled={disabled}
          value={selectedOptions}
          onChange={handleChangeSelect}
        />
        {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
      </>
    );
  }
  else if (props.type === 'select' && props.creatable) {
    const { options, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue, handleCreateOption, creatable, createtext } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])

    return (
      <>
        <CreatableSelect
          options={options}
          isClearable={clearable}
          isMulti={isMulti}
          isDisabled={disabled}
          value={selectedOptions}
          onChange={handleChangeSelect}
          onCreateOption={handleCreateOption}
          formatCreateLabel={createtext ? createtext : undefined}
        />
        {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
      </>
    );
  }
  else if (props.type === 'remoteSelect' && !props.creatable) {
    const { optionPromise, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])

    return (
      <>
        <AsyncSelect
          isClearable={clearable}
          isMulti={isMulti}
          isDisabled={disabled}
          value={selectedOptions}
          onChange={handleChangeSelect}
          cacheOptions={true}
          defaultOptions={true}
          loadOptions={optionPromise}
        />
        {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
      </>
    );
  }
  else if (props.type === 'remoteSelect' && props.creatable) {
    const { optionPromise, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue, handleCreateOption, creatable, createtext } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])

    return (
      <>
        <AsyncCreatebleSelect
          isClearable={clearable}
          isMulti={isMulti}
          isDisabled={disabled}
          value={selectedOptions}
          onChange={handleChangeSelect}
          cacheOptions={true}
          defaultOptions={true}
          loadOptions={optionPromise}
          onCreateOption={handleCreateOption}
          formatCreateLabel={createtext ? createtext : undefined}
        />
        {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
      </>
    );
  }
  else if (props.type === 'dependabledropdown' && !props.creatable) {
    const { previousSelect, options, optionPromise, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])
    useEffect(() => {
      setSelectedOptions(null)
    }, [previousSelect])
    if (optionPromise) {
      return (
        <>
          <AsyncSelect
            isClearable={clearable}
            isMulti={isMulti}
            isDisabled={disabled}
            value={selectedOptions}
            onChange={handleChangeSelect}
            cacheOptions={true}
            defaultOptions={true}
            loadOptions={optionPromise}
          />
          {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
        </>
      );
    }
    else if (options) {
      <>
        <Select
          options={options}
          isClearable={clearable}
          isMulti={isMulti}
          isDisabled={disabled}
          value={selectedOptions}
          onChange={handleChangeSelect}
        />
        {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
      </>
    }
  }
  else if (props.type === 'dependabledropdown' && props.creatable) {
    const {options, previousSelect, optionPromise, clearable = false, inputchange, isMulti = false, maxOptions, placeholder, disabled = false, defaultValue, handleCreateOption, creatable, createtext } = props;
    useEffect(() => {
      if (defaultValue) {
        setSelectedOptions(defaultValue)
      }
    }, [])
    useEffect(() => {
      setSelectedOptions(null)
    }, [previousSelect])
    if (optionPromise) {
      return (
        <>
          <AsyncCreatebleSelect
            isClearable={clearable}
            isMulti={isMulti}
            isDisabled={disabled}
            value={selectedOptions}
            onChange={handleChangeSelect}
            cacheOptions={true}
            defaultOptions={true}
            loadOptions={optionPromise}
            onCreateOption={handleCreateOption}
            formatCreateLabel={createtext ? createtext : undefined}
          />
          {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
        </>
      );
    }
    else if(options){
      return (
        <>
          <CreatableSelect
            options={options}
            isClearable={clearable}
            isMulti={isMulti}
            isDisabled={disabled}
            value={selectedOptions}
            onChange={handleChangeSelect}
            onCreateOption={handleCreateOption}
            formatCreateLabel={createtext ? createtext : undefined}
          />
          {maxSelectError && <MaxSelectOptionMessage maxoptions={props.maxOptions ? props.maxOptions : 0} />}
        </>
      );
    }
  }
}

function MaxSelectOptionMessage({ maxoptions }: { maxoptions: number }) {
  return <span className="text-danger form-text">{`Sorry! Can't select more than ${maxoptions}`}</span>
}

export default SlectDropdown;
