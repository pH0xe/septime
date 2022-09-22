export class LinkModel {
  icon: string;

  label: string;

  routeName: string;

  constructor(obj: Partial<LinkModel>) {
    Object.assign(this, obj);
  }
}
