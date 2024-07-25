import * as React from 'react'

function TextInput(item: any) {
    console.log(item,' item textinput');
    
    if(item.leftplaceText || item.rightplaceText) {
        return (
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
              <input
                type={item.type}
                // {...item.field}
                className={`${
                  item.errors[item.name] ? "is-invalid" : ""
                } ${
                  item.classinput
                    ? item.classinput
                    : "form-control"
                }`}
                placeholder={`${
                  item.placeholder ? item.placeholder : ""
                }`}
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
    
     else if(!item.rightplaceText && !item.leftplaceText){return (
        
            <input
              type={item.type}
            //   {...item.field}
              className={`${
                item.errors[item.name] ? "is-invalid" : ""
              } ${
                item.classinput
                  ? item.classinput
                  : "form-control"
              }`}
              placeholder={`${
                item.placeholder ? item.placeholder : ""
              }`}
            />
        
        
      )
    }
    else{
        return(
            <div className="w-100">
Sorry! these will not be used.
            </div>
        )
    }
}

export default TextInput