import { getToken } from "./api/getToken.js";

function sendFormData(formData) {
  return new Promise((resolve, reject) => {
    let data = Object.fromEntries(formData.entries());
    getToken(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { sendFormData };
