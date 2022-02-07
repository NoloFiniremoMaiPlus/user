export const localhost = "https://site202132.tw.cs.unibo.it";

export const status = {
  Mint: "Perfette Condizioni",
  SlightlyDamaged: "Lievemente Danneggiato",
  Damaged: "Danneggiato",
  Broken: "Rotto",
};

export const rentStatus = {
  Booked: "Prenotato",
  Accepted: "Accettato",
  Ongoing: "In Corso",
  Expired: "Scaduto",
  Returned: "Restituito",
};

export function getToken() {
  return localStorage.getItem("token");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function getExpires() {
  return localStorage.getItem("expires");
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function logout() {
  clearLocalStorage();
  window.location.href = "/";
}

export function getUser() {
  let expires = getExpires();
  let currentDate = new Date().toISOString();
  if (getToken() && getRefreshToken() && expires && currentDate < expires) {
    return localStorage.getItem("username");
  } else {
    clearLocalStorage();
    return null;
  }
}

export function saveToLocalStorage(res) {
  localStorage.setItem("token", res.tokens.access.token);
  localStorage.setItem("expires", res.tokens.access.expires);
  localStorage.setItem("refreshToken", res.tokens.refresh.token);
  localStorage.setItem("username", res.user.username);
  localStorage.setItem("userId", res.user.id);
  localStorage.setItem("name", res.user.name);
  localStorage.setItem("surname", res.user.surname);
  localStorage.setItem("email", res.user.email);
  localStorage.setItem("phone", res.user.phone);
  localStorage.setItem("loyalty", res.user.loyalty);
}

export function updateLocalStorage(user) {
  localStorage.setItem("username", user.username);
  localStorage.setItem("name", user.name);
  localStorage.setItem("surname", user.surname);
  localStorage.setItem("email", user.email);
  localStorage.setItem("phone", user.phone);
}

export async function createUser(user) {
  return fetch(localhost + "/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export async function loginUser(credentials) {
  return fetch(localhost + "/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function updateProfile(user) {
  return fetch(localhost + "/v1/users/" + getUserId(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export async function getItem(id) {
  return fetch(localhost + "/v1/items/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  }).then((data) => data.json());
}

export async function getUserById(id) {
  return fetch(localhost + "/v1/users/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  }).then((data) => data.json());
}

export async function getItems() {
  return fetch(localhost + "/v1/items?sortBy=totalPrice:asc&enabled=true", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  }).then((data) => data.json());
}

export async function searchBestItem(category) {
  return fetch(
    localhost +
      `/v1/items?sortBy=totalPrice:asc&category=${category}&limit=1&enabled=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }
  ).then((data) => data.json());
}

export async function getCategories() {
  return fetch(localhost + "/v1/items/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function getBrands() {
  return fetch(localhost + "/v1/items/brands", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data.json();
  });
}

export async function getStates() {
  const itemStates = {
    Mint: "Nuovo",
    SlightlyDamaged: "Qualche Imperfezione",
    Damaged: "Danneggiato",
    Broken: "Rotto",
  };
  return itemStates;
}

export async function getOrders(user) {
  return fetch(localhost + "/v1/rentals?sortBy=state:asc&user=" + user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  }).then((data) => data.json());
}

export async function deleteOrder(id) {
  console.log(id);
  return fetch(localhost + "/v1/rentals/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
}

export async function postRental(item, from, to, loyalty, estimate) {
  from = from.toISOString().substring(0, 10);
  to = to.toISOString().substring(0, 10);
  return fetch(localhost + "/v1/rentals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify({
      user: getUserId(),
      item: item,
      from: from,
      to: to,
      loyalty: loyalty,
      estimate: estimate,
    }),
  }).then((data) => data.json());
}
