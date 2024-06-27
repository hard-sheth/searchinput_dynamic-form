import * as React from "react";
import { useEffect } from 'react'

function DebounceInput(item:any) {
  const columnFilterValue = item.column.columnDef.meta
  const [value, setValue] = React.useState('')
  const [value1, setValue1] = React.useState<any>([]);
  useEffect(() => {
    item.column.setFilterValue(value);
  }, [value]);
  return (<>
      {columnFilterValue.filterVariant === 'search' &&<input type='search' className='form-control'  value={value} onChange={e => setValue(e.target.value)} />}
      {columnFilterValue.filterVariant === 'number' &&<input type='number' className='form-control'  value={value} onChange={e => setValue(e.target.value)} />}
      {columnFilterValue.filterVariant === 'range' && <div className='d-flex'>
        <input type='number' name='min' className='form-control' onChange={e => {
          const minValue = value1;
          minValue[0] = e.target.value;
          console.log(minValue, 'minValue');
          item.column.setFilterValue(minValue);
          }} />
        <input type='number' name='max' className='form-control ms-3' onChange={e => {
          const maxValue = value1;
          maxValue[1] = e.target.value;
          console.log(maxValue, 'maxValue');
          item.column.setFilterValue(maxValue);
          }} />
      </div>}
      {columnFilterValue.filterVariant === 'select' && <select className='form-select'  multiple={columnFilterValue.isMulti} onChange={e => {
        if(!columnFilterValue.isMulti){
          setValue(e.target.value)
        }
        }} >
        {columnFilterValue.options.map((item:string,index:number)=>{
          return(<option value={item} key={index}>{item}</option>)
        })}
      </select>}
    </>
  )
}

export default DebounceInput