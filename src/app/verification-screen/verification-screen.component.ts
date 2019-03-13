import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Subscription, of } from 'rxjs';
import { finalize, catchError, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'lto-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.scss']
})
export class VerificationScreenComponent implements OnInit {
  @Input()
  hash!: string;

  @Output()
  resetHash = new EventEmitter();

  verificating = false;
  anchorData: any = null;
  anchoring = false;

  private _host = '';
  // private _host = 'http://anchor-demo.lto.network';
  private _subscriptions = new Subscription();

  constructor(private _http: HttpClient, private _snackbar: MatSnackBar) {}

  ngOnInit() {
    this._verify();
  }

  backClickHandler() {
    this.resetHash.next();
  }

  createAnchor() {
    this.anchoring = true;
    this._subscriptions.add(
      this._http
        .post(`${this._host}/hash`, { hash: this.hash })
        .pipe(
          tap(() => {
            this._snackbar.open('Anchor creting. It can take up tp 30sec.', 'Dismiss');
          }),
          delay(3000)
        )
        .subscribe(anchorData => {
          this.anchorData = anchorData;
          this.anchoring = false;
        })
    );
  }

  buildExplorerUrl() {
    const transaction = this.anchorData.chainpoint.anchors[0].sourceId;
    const hash = this.hash;
    return `https://testnet-explorer.lto.network/transaction/${transaction}?hash=${hash}`;
  }

  private _verify() {
    this.verificating = true;
    this._subscriptions.add(
      this._http
        .get<any>(`${this._host}/hash/${this.hash}`)
        .pipe(catchError(err => of(null)))
        .subscribe(anchorData => {
          this.anchorData = anchorData;
          this.verificating = false;
        })
    );
  }
}
