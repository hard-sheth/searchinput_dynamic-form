type InputfieldsOptions = {
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
    maxInput?: number;
    minInput?: number;
  };
  
  type Inputfields<T> = T & {
    successValidation?: boolean; // This property controls the presence of dependentProperty
} & (T extends { successValidation: true }
    ? { successValidationMessage: string } // If isEnabled is true, dependentProperty must exist
    : { successValidationMessage?: never }); // If isEnabled is false or not present, dependentProperty should not exist

  type InputOptionList = Inputfields<InputfieldsOptions> & {
    type:
      | "text"
      | "search"
      | "textarea"
      | "telephone"
      | "password"
      | "email"
      | "searchoption"
      | "switch";
  };
  
  type RadioFields = Inputfields<InputfieldsOptions> & {
    type: "radio";
    placeForLabel: "inline" | "new line";
    radioOptions: SelectOptionsDynamic[];
  };
  
  type CheckboxFields = Inputfields<InputfieldsOptions> & {
    type: "checkbox";
    options: [CheckBoxOptionsDynamic];
  };
  
  type SelectAsync = Inputfields<InputfieldsOptions> & {
    type: "select";
    options: SelectOptionsDynamic[];
    defaultvalue?: string | SelectOptionsDynamic;
    isMulti: boolean;
    maxOptions: number;
    inputchange?: (data: string) => {};
    url: string;
    createable?: boolean;
    optionPromise: () => void;
    // Promise<SelectOptions[]>
  };
  
  type SelectDependable = Inputfields<InputfieldsOptions> & {
    type: "dependabledropdown";
    url?: string;
    previousSelect: string;
    options: SelectOptionsDynamic[];
    isMulti: boolean;
    maxOptions: number;
    inputchange?: (data: string) => {};
    optionPromise: () => void;
  };
  
  type VoiceText = Inputfields<InputfieldsOptions> & {
    type: "voicetext";
  };
  
  export interface SelectOptionsDynamic {
    label: string;
    value: string;
  }
  
  export interface CheckBoxOptionsDynamic {
    label: JSX.Element | string;
  }
  
  type FileTypes = Inputfields<InputfieldsOptions> & {
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
  
  export type inputTypesDiffDynamic =
    | RadioFields
    | SelectAsync
    | SelectDependable
    | CheckboxFields
    | FileTypes
    | SecureFields
    | FormArray
    | VoiceText
    | FloatNumberInputProp
    | NumberInputProp
    | InputOptionList;
  
  type FormArray = Inputfields<InputfieldsOptions> & {
    type: "arrayform";
    details: inputTypesDiffDynamic[];
    arrayformclass?: string;
  };

 export type NumberInputProp = Inputfields<InputfieldsOptions> & {
    type: "number" ;
    
  }

  type FloatNumberInputProp= Inputfields<InputfieldsOptions> & {
    type: "float";
    step: string
  }

  type SecureFields = Inputfields<InputfieldsOptions> & {
    type: "secure";
    inputType: 'number' | 'text'
  };