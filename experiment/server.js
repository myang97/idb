const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./build'));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const server = app.listen(8080, () => {
  const host = "localhost";
  const port = "8080";

  console.log(`Example app listening at http://${host}:${port}`);
});
