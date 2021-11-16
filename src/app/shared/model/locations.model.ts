import {Id} from './common.model';

export class LocationsModel implements Id {
  public id?: string;
  public name: string;
  public address: string;
  public neighborhood: string;
  public zip: string;
  public salesTax: number;

  constructor(location: any = {}) {
    this.id = location.id;
    this.name = location.name;
    this.address = location.address;
    this.neighborhood = location.neighborhood;
    this.zip = location.zip;
    this.salesTax = location.salesTax;
  }
}
