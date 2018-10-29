const express = require('express'),
      app     = express();

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.listen(process.env.PORT || 1245, () => {
  console.log("Hello World");
})