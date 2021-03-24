const express = require('express')
const app = express()
const port = 8000

app.get('/api/hello', (req, res) => {
    res.send(JSON.stringify({ greeting: `Hello Name!` }));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})