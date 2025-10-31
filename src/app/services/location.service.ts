import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://localhost:3000/api'; // your NestJS base URL
  private countriesCache: string[] | null = null;

  constructor(private http: HttpClient) { }


  async getCountries(): Promise<string[]> {
    if (this.countriesCache) {
      console.log('[FRONTEND] Returning cached countries');
      return this.countriesCache;
    }

    console.log('[FRONTEND] Fetching countries from backend...');
    const countries = await this.http
      .get<string[]>(`${this.apiUrl}/countries`)
      .toPromise();

    this.countriesCache = countries || [];
    return this.countriesCache;
  }


  getStates(country: string): Observable<string[]> {
    console.log(`[FRONTEND] Fetching states for country: ${country}`);
    // Adjust endpoint if your NestJS API expects ID instead of name
    return this.http.get<string[]>(`${this.apiUrl}/states?country=${country}`);
  }

  /** ✅ Fetch cities for selected state (by name) */
  getCities(country: string, state: string): Observable<string[]> {
    console.log(`[FRONTEND] Fetching cities for state: ${state}, country: ${country}`);
    // Adjust endpoint to match your backend
    return this.http.get<string[]>(`${this.apiUrl}/cities?country=${country}&state=${state}`);
  }
}
