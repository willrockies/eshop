import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@bluebits/users';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/pt.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers)
  }
  getuser(userId: User): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
  }

  createuser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user)
  }

  updateuser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user)
  }

  deleteuser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`)
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('pt', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'pt');
  }

}