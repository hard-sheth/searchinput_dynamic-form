import * as React from 'react';
import { MultiValue, SingleValue } from 'react-select';


export type selectComponentProps=(SelectField|SelectAsync|SelectDependable) & {forceReset?: boolean} & (
  |{
    creatable: true, 
    handleCreateOption:(data:string|unknown)=>void|Promise, 
    createtext?: (data:string)=> string|React.ReactNode,
  }
  |{
    creatable?: never; // This means it can be omitted entirely
    handleCreateOption?: never; // Cannot exist
    createText?: never; // Cannot exist
    }
  | {
    creatable: false;
    handleCreateOption?: never;
    createText?: never;
  }
) & {
  defaultValue?:  SingleValue<SelectOptions> | MultiValue<SelectOptions>,
  clearable?: boolean,
  loading?: boolean,
  disabled?: boolean
  inputchange?: (data: string) => void;
  placeholder?: string;

}


type SelectField = {
  type: "select";
  isMulti?: boolean;
  maxOptions?: number;
  options: SelectOptions[]|GroupBase<never>[];
  defaultvalue?: SelectOptions;
};

type SelectAsync = {
  type: 'remoteSelect'
  isMulti?: boolean;
  maxOptions?: number;
  createable?: boolean;
  optionPromise: (inputValue: string, callback: (options: OptionsOrGroups<Option, Group>) => void) => Promise<OptionsOrGroups<Option, Group>> | void|Promise<SelectOptions[]>|undefined;
  defaultvalue?: SelectOptions;
};

type SelectDependable = {
  type: "dependabledropdown";
  isMulti?: boolean;  
  maxOptions?: number;
  previousSelect: string;
}& (
  | { options: SelectOptions[]|GroupBase<never>[], optionPromise?: never } // If options are present, optionPromise must not be
  | { optionPromise: (inputValue: string, callback: (options: OptionsOrGroups<Option, Group>) => void) => Promise<OptionsOrGroups<Option, Group>> | void|Promise<SelectOptions[]>|undefined; options?: never } // If optionPromise is present, options must not be
);

export interface SelectOptions {
  label: string;
  value: string;
}

type Person = {
  name: string;
  age: number;
} & {
  isStudent: boolean;
  school?: string;
} & {
  isEmployed: boolean;
  company?: string;
  position?: string;
};