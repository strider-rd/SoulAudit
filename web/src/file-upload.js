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
      {props.file !== null && props.file !== undefined && (
        <button
          className="button"
          onClick={() => props.uploadClick(props.file)}>
          Audit File - {props.file.name}
        </button>
      )}
    </div>
  );
}
