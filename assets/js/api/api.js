// let token = "70dd6d15-1769-4113-a892-9664144ebf41";

// async function fetchData(url, fetchMethod, data = null) {
//   const options = {
//     method: `${fetchMethod}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   if (data) {
//     options.body = data;
//   }

//   try {
//     const response = await fetch(url, options);
//     console.log(response);
//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.message || "Помилка методу fetch");
//     }

//     return responseData;
//   } catch (error) {
//     console.error("Помилка:", error);
//     throw error;
//   }
// }

// async function fetchData(url, fetchMethod, data = null) {
//   const options = {
//     method: `${fetchMethod}`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   try {
//     const response = await fetch(url, options);
//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.message || "Помилка запиту");
//     }

//     return responseData;
//   } catch (error) {
//     console.error("Помилка:", error);
//     throw error;
//   }
// }

// export { fetchData };
