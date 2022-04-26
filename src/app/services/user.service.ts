import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersFilter } from 'src/app/models/users-filter.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

export interface UsersAPIResponse {
  results: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  usersApiUrl = 'https://randomuser.me/api/';
  fieldsToInclude = 'gender,picture,name,location,email,dob,phone,registered';

  getUsers(filter?: UsersFilter): Observable<UsersAPIResponse> {
    let params = new HttpParams()
      .append('results', 200)
      .append('inc', this.fieldsToInclude);
    if (filter?.gender) {
      params = params.append('gender', filter?.gender);
    }
    if (filter?.nationality) {
      params = params.append('nat', filter?.nationality);
    }
    return this.httpClient.get<UsersAPIResponse>(this.usersApiUrl, { params });
  }
}
