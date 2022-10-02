export function showLoader() {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('lintData').style.display = 'none';
}

export function hideLoader(isError) {
  document.getElementById('loader').style.display = 'none';
  if (!isError) document.getElementById('lintData').style.display = 'block';
}
