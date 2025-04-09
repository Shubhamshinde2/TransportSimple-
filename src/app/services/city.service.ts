import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private allCitiesApiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

  constructor(private http: HttpClient) { }


  getCities(): Observable<any> {
    return this.http.post(this.allCitiesApiUrl, { country: 'India' });
  }


  getCityLatLon(city: string): Observable<any> {
    return this.http.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
  }
  
  getCitiesBetween(startLat: number, startLon: number, endLat: number, endLon: number): Observable<any> {
    const south = Math.min(startLat, endLat);
    const north = Math.max(startLat, endLat);
    const west = Math.min(startLon, endLon);
    const east = Math.max(startLon, endLon);
  
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[place=city](${south},${west},${north},${east});out;`;
    
    return this.http.get(url);
  }
  

  getNearbyCities(lat: number, lon: number): Observable<any> {
    return this.http.get(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:50000,${lat},${lon})[place=city];out;`);
  }
}
