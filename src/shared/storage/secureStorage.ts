import { Platform } from "react-native";

import * as SecureStore from "expo-secure-store";

const WEB_PREFIX = "web-auth:";

export async function setItem(key: string, value: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(WEB_PREFIX + key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getItem(key: string) {
  if (Platform.OS === "web") {
    return localStorage.getItem(WEB_PREFIX + key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export async function deleteItem(key: string) {
  if (Platform.OS === "web") {
    localStorage.removeItem(WEB_PREFIX + key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
