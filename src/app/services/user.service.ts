import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersFilter } from 'src/app/models/users-filter.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

interface UsersAPIResponse {
  results: User[];
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(filter?: UsersFilter): Observable<UsersAPIResponse> {
    let params = new HttpParams()
      .append('results', 20);
    if (filter?.gender) {
      params = params.append('gender', filter?.gender);
    }
    if (filter?.nationality) {
      params = params.append('nat', filter?.nationality);
    }
    return this.httpClient.get<UsersAPIResponse>('https://randomuser.me/api/', { params });
  }
}
