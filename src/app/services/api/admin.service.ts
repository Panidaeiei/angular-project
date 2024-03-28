import { Injectable } from '@angular/core';
import { Constants } from '../../project/user/config/constants';
import { CatModel, UserModel,UserIMG } from '../../model';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class  AdminService {
  private readonly headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private constants: Constants, private http: HttpClient) {}

  setUserInLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  clearUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  public async getProUser() {
    const url = this.constants.API_ENDPOINT + '/admin/adminuser';
    const response = await lastValueFrom(this.http.get(url));
    return response as UserModel[];
  }
   async getUserIMG(body:any){
    const url=this.constants.API_ENDPOINT+'/admin/getIMG';
    const response=await lastValueFrom(this.http.post(url,body));
    return response as UserIMG[];
}
}
