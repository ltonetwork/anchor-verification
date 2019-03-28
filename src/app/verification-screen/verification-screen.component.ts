import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Subscription, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'lto-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.scss']
})
export class VerificationScreenComponent implements OnInit {
  @Input()
  hash!: string;

  @Input() host!: string;

  @Input() explorerHost = '';

  @Output()
  resetHash = new EventEmitter();

  verificating = false;
  anchorData: any = null;
  anchoring = false;

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
        .post(`${this.host}/hash`, { hash: this.hash })
        .pipe(
          tap(() => {
            this._snackbar.open('Anchor creating. It can take up to 30sec.', 'Dismiss', {
              duration: 5000
            });
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
    // return `https://testnet-explorer.lto.network/transaction/${transaction}?hash=${hash}`;
    return `${this.explorerHost}/transaction/${transaction}?hash=${hash}`;
  }

  private _verify() {
    this.verificating = true;
    this._subscriptions.add(
      this._http
        .get<any>(`${this.host}/hash/${this.hash}`)
        .pipe(catchError(err => of(null)))
        .subscribe(anchorData => {
          this.anchorData = anchorData;
          this.verificating = false;
        })
    );
  }
}
