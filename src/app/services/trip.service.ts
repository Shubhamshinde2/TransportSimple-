import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private trips: Trip[] = [];

  getTrips(): Trip[] {
    return this.trips;
  }

  addTrip(start: string, end: string): void {
    const lastTrip = this.trips[this.trips.length - 1];
    let level = 1;
    let isContinued = false;
    if (lastTrip) {
      if (lastTrip.end === start) {
        isContinued = true; 
        level = 1;
      } else if (lastTrip.start === start && lastTrip.end === end) {
        level = 2; 
      } else {
        level = 1; 
      }
    }

    this.trips.push({ start, end, level, isContinued });
  }

  removeTrip(index: number): void {
    this.trips.splice(index, 1);
  }

  checkTripType(): string {
    if (this.trips.length < 2) {
      return 'Add at least 2 Trips';
    }

    const isNonStop = this.trips.every((trip, index, arr) => {
      if (index === 0) return true;
      return arr[index - 1].end === trip.start;
    });

    return isNonStop ? 'Non-Stop Route' : 'Stop Route';
  }
}
