  import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select";

function DependantDropdown(props: any) {
  const [options, setOptions] = useState();

  const { dependData, dependUrl, value } = props;

  const [selectedOptions, setSelectedOptions] = useState(props.value);

  const loadOption = async () => {
    if (dependData && dependData?.value !== "") {
      const data = {
        country: dependData?.value || "India",
      };

      const optionLabels = await axios.post(dependUrl, {
        ...data,
      });

      const response = optionLabels.data;

      let labelsOPtion = response.data.states;

      labelsOPtion = labelsOPtion.map((item:any) => {
        return {
          // item.iso2
          label: item.name,
          value: item.name,
        };
      });

      setOptions(labelsOPtion);
    }
  };

  useEffect(() => {
    loadOption();
  }, [dependData]);

  useEffect(() => {
    if(value){
      setSelectedOptions(value);    
    } else if(!value){
      setSelectedOptions([]);    
    }
  }, [value]);

  return (
    <AsyncSelect
      {...props}
      value={selectedOptions}
      cacheOptions={true}
      defaultOptions={true}
      options={options}
      isMulti={true}
      isClearable
      onChange={(e:any) => {
        if (e.length <= props.maxOptions) {
          setSelectedOptions(e);
          props.onChange(e);
        } else if (!Array.isArray(e) && typeof e === "object") {
          props.onChange(e);
        } else {
          props.onChange(e);
        }
      }}
    />
  );
}

export default DependantDropdown;
