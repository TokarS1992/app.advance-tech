/**
 * Created by serge on 26.02.2017.
 */

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../translate/translate.service';

@Component ({

  selector : 'app-root',
  templateUrl :  '../../dist/html/translate.component.html',
  providers : [TranslateService]
})

export class TranslateComponent implements OnInit{

  public translatedText : string;
  public supportedLanguages : any[];

  constructor(private _translate: TranslateService) { }

  ngOnInit(){
    this.supportedLanguages = [
      {display:'English',value: 'en'},
      {display:'Russian',value : 'ru'},
      {display:'Ukrainian',value : 'ukr'},
    ];

    //set current langage

    this.selectLang('ru');

  }
  isCurrentLang(lang: string){
    return lang === this._translate.currentLang;

  }
  selectLang(lang:string){
    this._translate.use(lang);
    this.refreshText();



  }
  refreshText() {
    this.translatedText = this._translate.instant('hello world');
  }
}

