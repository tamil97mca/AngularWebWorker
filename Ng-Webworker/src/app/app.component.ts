import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ng-Webworker';

  selectedColour: any;
  result: any;
  colourArr = ['#9999ff', '#00aaff', '#008000', '#b33c00', '#663300', '#cc3399'];
  isBusy = false;
  cpuWorker: any;
  webWorkerResult: any;

  constructor() {
    this.initializeWebWorkerInstance();
  }

  initializeWebWorkerInstance() {

    if (typeof Worker !== 'undefined') {
      // Create a new
      this.cpuWorker = new Worker(new URL('./webworker/cpu.worker', import.meta.url));
      // worker.onmessage = ({ data }) => {
      //   console.log(`Page got a message from a web worker: ${data}`);
      // };
      // worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

  }

  isLoading: boolean = false;
  cpuIntensiveWorkwithWebWorker() {
    this.isLoading = true;
    this.webWorkerResult = '';

    this.cpuWorker.postMessage("Message from main thread");

    this.cpuWorker.addEventListener("message", ((res:any) => {
      console.warn("res", res);
      this.webWorkerResult = res.data;
      this.isLoading = false;
    }))
  }

  changeColor(color: string) {
    this.selectedColour = color;
  }

  cpuIntensiveWorkwithoutWebWorker() {

    this.result = '';

    this.isLoading = true;
    const start = new Date().getTime();
    let calResult = 0;
    for (let i = Math.pow(environment.baseNumber, 7); i >= 0; i--) {
      calResult += Math.atan(i) * Math.tan(i);
    };

    let elapsed = new Date().getTime() - start;
    const milliseconds = (elapsed % 1000) / 100;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    this.result = { 'TimeElapsed': `${minutes}m, ${seconds}s, ${milliseconds}ms`, 'output': calResult };
    this.isLoading = false;
  }


}
