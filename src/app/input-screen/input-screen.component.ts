import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'lto-input-screen',
  templateUrl: './input-screen.component.html',
  styleUrls: ['./input-screen.component.scss']
})
export class InputScreenComponent implements OnInit {
  @Input()
  inputType = 'Text';

  useEncription = false;
  textInput = '';
  password = '';

  selectedFileData: ArrayBuffer | null = null;

  get cantVerify() {
    return this.inputType === 'Text' ? this.textInput === '' : this.selectedFileData === null;
  }

  @Output()
  verify = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  setInputType(inputType: string) {
    this.inputType = inputType;
  }

  fileSelected(data: ArrayBuffer) {
    this.selectedFileData = data;
  }

  verifyClickHandler() {
    const hash = this._getHash();
    this.verify.next(hash);
  }

  private _getHash() {
    const data = this.inputType === 'Text' ? this.textInput : this.selectedFileData;
    if (data && data !== '') {
      return this.useEncription ? this._encrypt(data) : sha256(data);
    }

    return '';
  }

  private _encrypt(hash: string | ArrayBuffer): string {

    let wordArray;
    if (typeof hash === 'string') {
      wordArray = hash;
    } else {
      wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(hash));
    }

    return CryptoJS.HmacSHA256(wordArray, this.password).toString();
  }
}
