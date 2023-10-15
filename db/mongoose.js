const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log(`Database connected: ${conn.connection.host}}`);
  })
  .catch((err) => {
    console.log(`Database Error: ${err.message}`);
    process.exit(1);
  });
