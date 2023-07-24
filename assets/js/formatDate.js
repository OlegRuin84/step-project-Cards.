function formatDate(a) {
  let parts = a.split("-");
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];

  let formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export { formatDate };
