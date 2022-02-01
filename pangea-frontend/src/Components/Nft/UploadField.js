import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import BiEdit from "../../Assets/react-icons/BiEdit.svg";
const UploadField = ({ setImageSrc, profile }) => {
  // styles
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
    backgroundColor: "transparent",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  //   ###############################################################3333
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ accept: "image/jpeg, image/png", maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    setImageSrc(acceptedFiles);
  }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li className="fileName" key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <>
        <li className="fileName" key={file.path}>
          {file.path} - {file.size} bytes
        </li>
        {errors.map((e) => (
          <p className="fileNameError" key={e.code}>
            {e.message}
          </p>
        ))}
      </>
    );
  });

  return !profile ? (
    <div className="upload__field" 
    
    // style={{borderRadius:"50px", borderWidth:"1px",borderColor:"red",borderStyle:"dashed"}}
    
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {/* <button type="file" style={{background:"red" ,color:"white",borderRadius:"30px",transition: "all 0.3s ease"}}>Browse</button> */}
        <p>(Only *.jpeg and *.png images will be accepted)</p>
      </div>
      <aside className="mt-3">
        {/* <h6>Files</h6> */}
        <ul>{acceptedFileItems}</ul>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </div>
  ) : (
    <div className="upload_icon" {...getRootProps()}>
      <input {...getInputProps()} />
      <img src={BiEdit} alt="BiEdit" />
    </div>
  );
};

export default UploadField;
