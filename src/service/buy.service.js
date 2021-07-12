export const buyRequest = (product) => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: product,
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
