export default function AuditFileUpload(props) {
  return (
    <div className="container container-column">
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
