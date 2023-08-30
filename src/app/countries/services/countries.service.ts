import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { CountryTableComponent } from '../components/country-table/country-table.component';
import { Region } from '../interfaces/region.type';
import { JsonPipe } from '@angular/common';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    public cacheStore: CacheStore = {
      byCapital: { term: '', countries: []},
      byCountry: { term: '', countries: []},
      byRegion:  { term: '', countries: []},
    }

    constructor(
        private http: HttpClient
    ) {
      this.loadFromLocalStorage();
     }

    private saveToLocalStorage(): void {
      localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage(): void {
      if( !localStorage.getItem('cacheStore') ) return;
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    seachCountryByAlphaCode( code: string ):Observable<Country | null> {
      const url = `${ this.apiUrl }/alpha/${ code }`;
        return this.http.get<Country[]>( url )
        .pipe(
          map( countries => countries.length > 0 ? countries[0] : null ),
          catchError( () => of(null) )
        )
    }

    private getCountriesRequest( url: string ): Observable<Country[]> {
      return this.http.get<Country[]>( url )
        .pipe(
          catchError( () => { return of([]) })
      )
    }

    searchCapital( term: string ): Observable<Country[]> {
      const url = `${ this.apiUrl }/capital/${ term }`;
      return this.getCountriesRequest( url )
        .pipe(
          tap( countries => this.cacheStore.byCapital = {term, countries}),
          tap( () => this.saveToLocalStorage() )
      );
    }

    searchCountry( term: string ): Observable<Country[]> {
      const url = `${ this.apiUrl }/name/${ term }`;
      return this.getCountriesRequest( url )
        .pipe(
          tap( countries => this.cacheStore.byCountry = {term, countries}),
          tap( () => this.saveToLocalStorage() )
      );;
    }

    searchRegion( term: Region ): Observable<Country[]>{
      const url = `${ this.apiUrl }/region/${ term }`;
      return this.getCountriesRequest( url )
        .pipe(
          tap( countries => this.cacheStore.byRegion = {term, countries}),
          tap( () => this.saveToLocalStorage() )
      );;
    }

}
