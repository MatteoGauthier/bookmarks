import fetch from "isomorphic-unfetch";
const AUTH_TOKEN = process.env.JSONBIN_TOKEN;

export const binRead = async ({ binId }) => {
  const response = await fetch(`https://api.jsonbin.io/b/${binId}/latest`, {
    headers: { "secret-key": AUTH_TOKEN },
  });
  if (response.status == 401) {
    return "You must provide an auth token";
  }

  if (response.status !== 200) {
    return response.error;
  }

  return response.json();
};

// Resolving without value, no need for reject
export const binSave = async ({ binId, newId, data }) =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "secret-key": AUTH_TOKEN,
      },
      body: JSON.stringify({
        newId,
        data,
      }),
    }).catch(err => console.log(err))
    if (response.status == 401) {
      reject("You must provide an auth token");
    }

    if (response.status !== 200) {
      reject(await response.json());
    }

    resolve(JSON.parse(await response.text()));
  });
