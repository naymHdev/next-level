import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    app.listen(config.port, () => {
      console.log(`Server running on this port >>-- ${config.port}`);
    });
  } catch (error) {
    `Error from server 😔 connection catch 🤮 block: ${error}`;
  }
}
main();
