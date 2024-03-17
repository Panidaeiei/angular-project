import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../project/user/config/constants';
import { CatModel } from '../../model';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatService {

constructor(private constants : Constants, private http: HttpClient) {}

  public async checklogin(name: any,password:any) {
    const url = this.constants.API_ENDPOINT + '/';
    const response = await lastValueFrom(this.http.get(url));
    return response as CatModel[];
 
}
}


