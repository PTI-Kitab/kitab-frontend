import { Controller } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import { List } from "@ckeditor/ckeditor5-list";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
} from "@ckeditor/ckeditor5-image";
import { Table } from "@ckeditor/ckeditor5-table";
import { LinkImage, Link, AutoLink } from "@ckeditor/ckeditor5-link";
import { Heading } from "@ckeditor/ckeditor5-heading";

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
      defaultValue={defaultValue ?? ""}
      render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
        <CKEditor
          ref={ref}
          onBlur={onBlur}
          disabled={disabled}
          editor={ClassicEditor}
          config={{
            plugins: [
              AutoLink,
              Essentials,
              Bold,
              Italic,
              Paragraph,
              Strikethrough,
              Underline,
              SimpleUploadAdapter,
              Image,
              ImageToolbar,
              ImageCaption,
              ImageStyle,
              ImageResize,
              LinkImage,
              Link,
              List,
              Table,
              Heading,
            ],
            toolbar: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "link",
              "insertImage",
              "insertTable",
              "|",
              "bulletedList",
              "numberedList",
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
              ],
            },
            table: {
              defaultHeadings: { rows: 1, columns: 1 },
            },
            image: {
              toolbar: [
                "imageTextAlternative",
                "toggleImageCaption",
                "|",
                "imageStyle:inline",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "imageStyle:side",
                "|",
                "resizeImage",
              ],
              insert: {
                // If this setting is omitted, the editor defaults to 'block'.
                // See explanation below.
                integrations: ["insertImageViaUrl"],
                type: "auto",
              },
            },
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
      )}
    />
  );
};

export default CKEditorWrapper;
