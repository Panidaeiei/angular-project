// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Constants } from '../../config/constants';
// import { TripGetResponse } from '../../model/trip_get_res';
// import { lastValueFrom } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TripService {
//   constructor(private constants : Constants, private http: HttpClient) {}

//   public async getTrip(options?: any) {
//     const url = this.constants.API_ENDPOINT + '/trip';
//     const response = await lastValueFrom(this.http.get(url));
//     return response as TripGetResponse[];
//   }
// }