import {Id} from './common.model';

export class NutritionFieldsModel implements Id {
  public id?: string;
  public name_en: string;
  public sort: number;
  public name_sp: string;
  public measurement_type: string;
  public measurement_display: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name_en = model.name_en;
    this.name_sp = model.name_sp;
    this.sort = model.sort;
    this.measurement_type = model.measurement_type;
    this.measurement_display = model.measurement_display;
  }
}
