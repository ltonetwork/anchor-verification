import { Component, Input } from '@angular/core';

type Step = 'input' | 'verification';
@Component({
  selector: 'lto-anchor-verification',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() host = '';

  title = 'lto-anchor-verification';
  step: Step = 'input';

  hash = '';

  setStep(step: Step) {
    this.step = step;
  }

  verify(hash: string) {
    this.hash = hash;
  }

  resetHash() {
    this.hash = '';
  }
}
