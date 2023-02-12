# AngularWebWorker

Follow these steps to see the proper output.

1) First clone the git repository (or) download the zip file.
2) Then open the project in VS Code.
3) Open Terminal.
4) `npm install --save`
5) `ng serve -o` (or) `ng s -o`

----------------------------

You can add a web worker anywhere in your application. For example, to add a web worker to the root component, `src/app/app.component.ts`, run the following command.

`ng generate web-worker <file-name>`

The command performs the following actions.

Configures your project to use web workers, if it isn't already.

Adds the following scaffold code to `src/app/app.worker.ts` to receive messages.

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

----------------------------

Adds the following scaffold code to src/app/app.component.ts to use the worker.

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
