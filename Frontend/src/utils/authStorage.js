import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(`${this.namespace}:auth`);
    return rawToken ? JSON.parse(rawToken) : [];
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:auth`, JSON.stringify(accessToken));
  }

  removeAccessToken() {
    AsyncStorage.removeItem(`${this.namespace}:auth`)
  }
}

export default AuthStorage;