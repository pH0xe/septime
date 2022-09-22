export class PartnerModel {
  name: string;

  logo: string;

  link: string;

  customStyle?: string;

  constructor(obj: Partial<PartnerModel>) {
    Object.assign(this, obj);
  }
}
