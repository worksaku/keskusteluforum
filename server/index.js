require('dotenv').config();
const app = require('./server');
const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
