const mongoose = require("mongoose");

const { PORT, DATABASE_URL } = process.env;
console.log("port__", PORT);

async function main() {
  await mongoose.connect(DATABASE_URL);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
