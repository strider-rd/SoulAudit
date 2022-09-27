export default function FileUpload(props) {
  return (
    <div className="container">
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="file-upload-wrapper" data-text="Select your file!">
          <input
            name="file-upload-field"
            type="file"
            className="file-upload-field"
            value=""
          />
        </div>
        <input
          type="file"
          id="file"
          name="file"
          onChange={props.onFileChange}
        />
        <button
          type="submit"
          className="btn btn-info"
          onClick={props.uploadClick}>
          {' '}
          Update File{' '}
        </button>
      </form>
    </div>
  );
}
