export default function FileUpload(props) {
  return (
    <div className="container">
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
    </div>
  );
}
