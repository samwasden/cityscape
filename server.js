const express = require('express')
const path = require('path')

const app = express()

app.use("/css", express.static(path.join(__dirname, '/src/style.css')))

app.use("/reset", express.static(path.join(__dirname, '/src/reset.css')))

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  
app.get('/three', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/js/three.js'))
  });

app.get('/scene', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/js/scene.js'))
  });

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })