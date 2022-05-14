import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

import "./style.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Uploader = ({
  label,
  value, //TODO : if value already exist ie on edit pages
  onChange,
  wrapperWidth = "144px",
  width = "144px",
  className,
  wrapperClassName,
  required = false,
  isDisabled,
  accept,
  maxSize = Infinity,
  minSize = 0,
  //   ...props
}) => {
  const [preview, setPreview] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setPreview(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropAccepted: (e) => {
      onChange(e[0]);
    },
    onDropRejected: (e, a) => {
      onChange(null);
    },

    disabled: isDisabled,
    maxSize,
    minSize,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const inputProps = getInputProps();

  const thumbs = preview.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  return (
    <div
      className={classNames("input-field-container", wrapperClassName, {
        required: required,
        disabled: isDisabled,
      })}
      style={{ width: width > wrapperWidth ? width : wrapperWidth }}
    >
      {label && <label>{label}</label>}
      <div className={classNames("upload-field", className)} style={{ width }}>
        <div
          {...getRootProps({
            style,
            // className: "upload-field-drag-box",
          })}
        >
          <input {...inputProps} />
          <p>Drag 'n' drop </p>
        </div>
        {thumbs.length ? <aside style={thumbsContainer}>{thumbs}</aside> : null}
        {fileRejections.length ? (
          <div className="error">{fileRejections?.[0].errors?.[0].message}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Uploader;
