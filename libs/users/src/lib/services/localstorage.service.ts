import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(key) {
    localStorage.setItem(TOKEN, key)
  }

  getToken(): string {
    return localStorage.getItem(TOKEN)
  }

  removeToken() {
    localStorage.removeItem(TOKEN)
  }
}
