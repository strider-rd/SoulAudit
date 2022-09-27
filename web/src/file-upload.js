export default function FileUpload(props) {
  return (
    <div className="max-height container">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="file"
          id="file"
          name="file"
          onChange={props.onFileChange}
        />
      </form>
      <button className="button" type="submit" onClick={props.uploadClick}>
        {' '}
        Update File{' '}
      </button>
      {props.fileName != null && props.fileName != undefined && (
        <p>Uploaded file: - {props.fileName}</p>
      )}
    </div>
  );
}
