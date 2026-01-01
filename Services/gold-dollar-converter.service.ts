import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoldDollarConverterService {
  
  GoldToDollar(gold : number){
    return gold * 4;
  }

  DollarToGold(dollar : number){
    return dollar / 4;
  }
}
