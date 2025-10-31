import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { CountryService } from '../services/location.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterModule, HttpClientModule],
  templateUrl: './add-client.html',
  styleUrls: ['./add-client.css'],
})
export class AddClient implements OnInit {
  client: any = {
    businessRegNo: '',
    taxRegNo: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactMobile: '',
    contactPhone: '',
    contactDesignation: '',
    companyFax: '',
    clientEmail: '',
    clientUsername: '',
    clientPassword: '',
    registeredCountry: '',
    registeredState: '',
    registeredCity: '',
    registeredAddress: '',
    mailingCountry: '',
    mailingState: '',
    mailingCity: '',
    mailingAddress: ''
  };

  sameAddress: boolean = false;

  signatureFile: File | null = null;
  signaturePreview: string | ArrayBuffer | null = null;

  countries: string[] = [];
  registeredStates: string[] = [];
  registeredCities: string[] = [];
  mailingStates: string[] = [];
  mailingCities: string[] = [];

  loadingCountries = false;
  loadingRegisteredStates = false;
  loadingRegisteredCities = false;
  loadingMailingStates = false;
  loadingMailingCities = false;

  constructor(private countryService: CountryService) { }

  async ngOnInit() {
    this.countries = await this.countryService.getCountries();
  }

 
  onRegisteredCountryChange() {
    const country = this.client.registeredCountry;
    this.registeredStates = [];
    this.registeredCities = [];
    this.client.registeredState = '';
    this.client.registeredCity = '';

    if (!country) return;

    this.loadingRegisteredStates = true;
    this.countryService.getStates(country).subscribe({
      next: (states) => {
        this.registeredStates = states;
        this.loadingRegisteredStates = false;

        // if same address is checked, update mailing info
        if (this.sameAddress) {
          this.copyAddressFields();
        }
      },
      error: (err) => {
        console.error('Failed to load states', err);
        this.loadingRegisteredStates = false;
      },
    });
  }

  
  onRegisteredStateChange() {
    const country = this.client.registeredCountry;
    const state = this.client.registeredState;
    this.registeredCities = [];
    this.client.registeredCity = '';

    if (!country || !state) return;

    this.loadingRegisteredCities = true;
    this.countryService.getCities(country, state).subscribe({
      next: (cities) => {
        this.registeredCities = cities;
        this.loadingRegisteredCities = false;

        // if same address is checked, update mailing info
        if (this.sameAddress) {
          this.copyAddressFields();
        }
      },
      error: (err) => {
        console.error('Failed to load cities', err);
        this.loadingRegisteredCities = false;
      },
    });
  }

  
  onMailingCountryChange() {
    const country = this.client.mailingCountry;
    this.mailingStates = [];
    this.mailingCities = [];
    this.client.mailingState = '';
    this.client.mailingCity = '';

    if (!country) return;

    this.loadingMailingStates = true;
    this.countryService.getStates(country).subscribe({
      next: (states) => {
        this.mailingStates = states;
        this.loadingMailingStates = false;
      },
      error: (err) => {
        console.error('Failed to load mailing states', err);
        this.loadingMailingStates = false;
      },
    });
  }

  onMailingStateChange() {
    const country = this.client.mailingCountry;
    const state = this.client.mailingState;
    this.mailingCities = [];
    this.client.mailingCity = '';

    if (!country || !state) return;

    this.loadingMailingCities = true;
    this.countryService.getCities(country, state).subscribe({
      next: (cities) => {
        this.mailingCities = cities;
        this.loadingMailingCities = false;
      },
      error: (err) => {
        console.error('Failed to load mailing cities', err);
        this.loadingMailingCities = false;
      },
    });
  }


  onSameAddressChange() {
    if (this.sameAddress) {
      this.copyAddressFields();
    } else {
      this.clearMailingFields();
    }
  }

  
  copyAddressFields() {
    this.client.mailingCountry = this.client.registeredCountry;
    this.client.mailingState = this.client.registeredState;
    this.client.mailingCity = this.client.registeredCity;
    this.client.mailingAddress = this.client.registeredAddress;

    this.mailingStates = [...this.registeredStates];
    this.mailingCities = [...this.registeredCities];
  }


  clearMailingFields() {
    this.client.mailingCountry = '';
    this.client.mailingState = '';
    this.client.mailingCity = '';
    this.client.mailingAddress = '';
    this.mailingStates = [];
    this.mailingCities = [];
  }

  onSignatureSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.signatureFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.signaturePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Submitting client:', this.client);
    alert('Form submitted — check console (replace with API call).');
  }
}
