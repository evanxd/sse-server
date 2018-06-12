let config = require('./config')
let db = require('./db')
let http = require('http')

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Content-Type', 'text/event-stream')

  let index = 0;
  sendEvent()

  function sendEvent() {
    let item = db[index]
    setTimeout(() => {
      let event = `event: ${item.event}`
      let id = `id: ${Date.now()}`
      let data = `data: ${JSON.stringify(item.data)}`
      res.write(`${event}\n${id}\n${data}\n\n`)

      index = db[index + 1] ? index + 1 : 0
      sendEvent()
    }, config.setTimeoutTimer)
  }
}).listen(config.port);
