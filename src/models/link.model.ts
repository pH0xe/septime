export class LinkModel {
  icon: string;

  label: string;

  name: string;

  constructor(obj: Partial<LinkModel>) {
    Object.assign(this, obj);
  }
}
