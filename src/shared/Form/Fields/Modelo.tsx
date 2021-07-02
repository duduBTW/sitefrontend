import { Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Control, Controller } from "react-hook-form";

function ModeloDef({
  control,
  name,
  label,
  rules,
  error,
  config = {},
}: {
  control?: Control<Record<string, any>>;
  name: string;
  label: string;
  rules: any;
  error: any;
  config: any;
}) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    require("@ckeditor/ckeditor5-build-classic/build/translations/pt-br");
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <div style={{ width: 640 }}>
      <div style={{ paddingBottom: 12 }}>
        <Typography variant="caption">{label}</Typography>
      </div>
      <Controller
        render={({ value, onChange }) => (
          <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
            config={{ language: "pt-br", content: "pt-br", ...config }}
          />
        )}
        name={name}
        control={control}
        rules={rules}
      />
    </div>
  ) : (
    <div>Editor loading</div>
  );
}

export default ModeloDef;
