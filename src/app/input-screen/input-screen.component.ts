import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HmacSHA256 } from 'crypto-js';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'lto-input-screen',
  templateUrl: './input-screen.component.html',
  styleUrls: ['./input-screen.component.scss']
})
export class InputScreenComponent implements OnInit {
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
      const hash = sha256(data);
      return this.useEncription ? this._encrypt(hash) : hash;
    }

    return '';
  }

  private _encrypt(hash: string): string {
    return HmacSHA256(hash, this.password).toString();
  }
}
