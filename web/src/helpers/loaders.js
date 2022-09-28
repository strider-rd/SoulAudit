export function showLoader() {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('lintData').style.display = 'none';
}

export function hideLoader() {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('lintData').style.display = 'block';
}
