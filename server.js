import http from "http"
import fs from "fs"

const servePage = (file, statusCode, res) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
      return
    }
    res.writeHead(statusCode, { 'Content-Type': 'text/html' })
    res.end(data)
  })
}

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, `https://${req.headers.host}`)
    switch (pathname) {
      case "/":
        servePage("./index.html", 200, res)
        break;
      case "/about":
        servePage("./about.html", 200, res)
        break;
      case "/contact-me":
        servePage("./contact-me.html", 200, res)
        break;
      default:
        servePage("./404.html", 404, res)
    }
  })
  .listen(8080, () => {
    console.log("Server running at http://localhost:8080");
  })
