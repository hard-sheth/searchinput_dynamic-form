import React from "react";

export function TextArea() {
  return (
    <div className={`form-control`}>
      {/* <Controller
        name={item.name}
        control={control}
        rules={{
          ...item.validationobj,
        }}
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <CKEditor
            editor={ClassicEditor}
            // data="<p>Hello from CKEditor&nbsp;5!</p>"
            data={value}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        )}
      /> */}
      Hello from CKEditor
    </div>
  );
}
