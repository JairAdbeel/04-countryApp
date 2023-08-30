import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Europe', 'Asia', 'Oceania', 'Americas'];
  public selectedRegion?: Region;

  constructor(
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.term;
  }

  searchByRegion( term: Region ): void {
    this.selectedRegion = term;
    this.countryService.searchRegion( term )
    .subscribe( country => {
      this.countries = country;
    });
  }

}
