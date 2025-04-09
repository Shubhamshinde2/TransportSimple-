import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from './services/trip.service';
import { CityService } from './services/city.service';
import { Trip } from './models/trip.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TransportSimple';
  tripForm: FormGroup;
  trips: Trip[] = [];
  cities: string[] = [];
  carPosition = 0;
  routeTypeMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private cityService: CityService
  ) {
    this.tripForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.trips = this.tripService.getTrips();
  }

  getCities() {
    this.cityService.getCities().subscribe((res: any) => {
      this.cities = res.data;
    });
  }

  addTrip() {
    const { start, end } = this.tripForm.value;
    this.tripService.addTrip(start, end);
    this.tripForm.reset();

    this.trips = this.tripService.getTrips();
    this.updateCarPosition();
  }

  removeTrip(index: number) {
    this.tripService.removeTrip(index);
    this.trips = this.tripService.getTrips();
    this.updateCarPosition();
  }

  checkRouteType() {
    this.routeTypeMessage = this.tripService.checkTripType();
  }

  updateCarPosition() {
    setTimeout(() => {
      this.carPosition = (this.trips.length / (this.trips.length + 1)) * 100;
    }, 300);
  }
}
