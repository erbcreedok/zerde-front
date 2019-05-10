export function getListFromLocalStorage(localStorageNaming, defData) {
  let data = localStorage.getItem(localStorageNaming);
  if (data) {
    try {
      data = JSON.parse(data);
    } catch(e) {
      data = defData;
    }
  } else {
    data = defData;
  }
  localStorage.setItem(localStorageNaming, JSON.stringify(data));
  return data;
}