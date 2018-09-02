import { store } from "./store";

export default function authHeader() {
    const state = store.getState();
    const auth = state.authentication;

    return auth && auth.token
        ? {
              Authorization: `Token ${auth.token}`,
              "Content-Type": "application/json"
          }
        : {};
}
