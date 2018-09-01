import { store } from "./store";

export default function authHeader() {
    const state = store.getState();
    const auth = state.authentication;

    return auth && auth.access ? { Authorization: `Token ${auth.token}` } : {};
}
