import { Controller } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {} from "@emotion/styled";
import { CSSReset } from "@chakra-ui/react";

// integrate with react-hook-form
type CKEditorProps = {
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  defaultValue?: string;
};

const CKEditorWrapper = ({ name, control, defaultValue }: CKEditorProps) => {
  const auth = useAuth();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
        <>
          <CSSReset />
          <CKEditor
            ref={ref}
            onBlur={onBlur}
            disabled={disabled}
            editor={Editor}
            config={{
              simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl:
                  import.meta.env.VITE_API_BASE_URL + "/upload/ckEditor/",

                // Enable the XMLHttpRequest.withCredentials property.
                withCredentials: true,

                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                  Authorization: `Bearer ${auth.user?.token}`,
                },
              },
            }}
            data={value}
            onChange={(_event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        </>
      )}
    />
  );
};

export default CKEditorWrapper;
