import React, { useEffect } from 'react'

function DebounceInput(item:any) {
    const columnFilterValue = item.column.columnDef.meta
    const [value, setValue] = React.useState('')
    console.log(item, 'item Debounce ', columnFilterValue, 'columnFilterValue',value);
    useEffect(()=>{
        if(value){
            item.column.setFilterValue(value)
        }
    },[value])
  return (
    <input type='search' value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default DebounceInput