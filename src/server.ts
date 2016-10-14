import * as koa from "koa";
import * as route from "koa-route";
import * as websockify from "koa-websocket";
import * as serve from "koa-static";

const app = websockify(new koa());

const websockets: any[] = [];

app.ws.use(route.all('/', function* (next:any) {

  this.websocket.on('message', function(message:any) {
    console.log('Message from client:', message);
  });

  this.websocket.on('close', function() {
    console.log('Client disconnected');
  });

  console.log('Client connected');
  websockets.push(this.websocket);

  // send a message to our client
  this.websocket.send('Hello Client!');

  // yielding `next` will pass the context (this) on to the next ws middleware
  yield next;
}));

app.use(serve('public'));

console.log('Listening on port 3000');
app.listen(3000);

// Read from console and send it over the websockets
import * as readline from "readline";

const c = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nextMessage = () => {
  c.question('what shall we send?', (answer) => {
    websockets.forEach(ws => {ws.send(answer)});
    nextMessage();
  })
}

nextMessage();
