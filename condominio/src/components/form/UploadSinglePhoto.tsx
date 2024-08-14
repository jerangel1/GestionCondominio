import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "./label";

const defaultAccept = { "image/jpg": [".png", ".jpg", ".jpeg", ".gif"] };

type UploadProps = {
  onDrop: ({ selectedFile }: { selectedFile: File }) => void;
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  maxSize?: number;
  activeBorder?: boolean;
  label: string;
};

export const UploadSinglePhoto = ({
  onDrop,
  label,
  accept = defaultAccept,
  maxFiles = 1,
  maxSize = 3242880,
  activeBorder = false,
}: UploadProps) => {
  const [files, setFiles] = useState<
    {
      preview: string;
    }[]
  >([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles: maxFiles,
    maxSize,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (onDrop) onDrop({ selectedFile: acceptedFiles[0] });
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      {label && (
        <Label
        // aria-invalid={errors && name ? !!errorMessage : false}
        // // srOnly={srOnly}
        // // htmlFor={uniqueId}
        // // className={customLabelClassName}
        >
          {label as string}
        </Label>
      )}
      <div
        className={clsx(
          "border-dashed py-4 px-4 cursor-pointer rounded-lg border shadow-sm",
          activeBorder ? "border-red-200" : "border-zinc-400"
        )}
      >
        <div {...getRootProps({ className: "block flex flex gap-4 flex-row" })}>
          <input className="input-zone" {...getInputProps()} />
          <div className="flex h-28 w-28 bg-blue-100/50 rounded-md items-center justify-center">
            {files.length > 0 ? (
              <img
                src={files[0].preview}
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview);
                }}
                className="h-full rounded-md w-full bg-cover"
              />
            ) : (
              <Upload className="text-blue-400" />
            )}
          </div>
          {files.length == 0 ? (
            <div className="mt-4">
              {isDragActive ? (
                <div>
                  Suelte aquí para subir el la imagen colocar los archivos aquí
                </div>
              ) : (
                <div>
                  <div className="font-medium">
                    Arrastra y suelta la imagen aquí, o haz clic para buscarla.
                  </div>
                  <div className=" mt-2 text-xs">
                    El formato de la imagen debe ser cuadrado. {"(1:1)"}
                  </div>
                </div>
              )}
              <br />
            </div>
          ) : (
            <div className="mt-4 font-medium">
              Haz click para cambiar de imagen.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
