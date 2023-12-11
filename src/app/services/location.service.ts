
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { getDocs, query } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  //  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

   users: Observable<any>;

  constructor(
    private api: ApiService,
  ) {
  }


  getLocations() {
    this.users = this.api.collectionDataQuery(
      'locations'
    )
    return this.users
  }
  

  async setLocation(lat: any, lng: any) {
    try {
      const location = {
        lat: lat,
        lng: lng,
        createdAt: new Date()
      }
        await this.api.addDocument(`locations/`, location)

    } catch (error) {
      throw (error)
    }
  }

}

