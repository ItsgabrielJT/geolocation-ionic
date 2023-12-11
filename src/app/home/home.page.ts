// home.page.ts
import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../services/location.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: any = 0;
  longitude: any = 0;
  dataListSubscription: Subscription;
  dataList: any[];

  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService
  ) { 
    this.locationService.getLocations().subscribe( (value) => {
      console.log(value);
      this.dataList=value;
    })
    
  }

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.locationService.setLocation(this.latitude, this.longitude)
    }).catch((error) => {
      console.log('Error, no se puede obtener tu ubicacion', error);
    });
  }


}