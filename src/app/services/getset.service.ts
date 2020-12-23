import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetsetService {
  Data: any;
  constructor() {}

  public setValue(value): void {
    this.Data = value;
  }

  public getValue(): any {
    console.log(this.Data);
    return this.Data;
  }
}
