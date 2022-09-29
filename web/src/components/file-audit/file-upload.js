export default function AuditFileUpload(props) {
  return (
    <div className="d-flex flex-column flex-gap">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          className="form-control"
          type="file"
          id="file"
          name="file"
          onChange={props.onFileChange}
        />
      </form>
      {props.file !== null && props.file !== undefined && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => props.uploadClick(props.file)}>
          Audit File - {props.file.name}
        </button>
      )}
    </div>
  );
}
