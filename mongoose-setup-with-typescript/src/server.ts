import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
// const port = 3000;

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    app.listen(config.port, () => {
      console.log(`Server running on this port >>-- ${config.port}`);
    });
  } catch (error) {
    `Error from server 😔 connection (server.ts) catch 🤮 block: ${error}`;
  }
}
main();
