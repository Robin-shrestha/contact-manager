import { httpBase } from "./httpbase";

export function fetch(endpoint, config = {}) {
  return httpBase().get(`/${endpoint}`, config);
}

export function store(endpoint, data, config = {}) {
  return httpBase().post(`/${endpoint}`, data, config);
}

export function update(endpoint, data, config = {}) {
  return httpBase().put(`/${endpoint}`, data, config);
}

export function destroy(endpoint, config = {}) {
  return httpBase().delete(`/${endpoint}`, config);
}
