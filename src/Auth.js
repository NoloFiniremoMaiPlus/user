import React from "react";

export const localhost = "https://192.168.1.9:8443";

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

//TODO: canche regiser route
export async function createUser(user) {
  return fetch(localhost + "/v1/users", {
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

export async function getItems() {
  return fetch(localhost + "/v1/items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
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
