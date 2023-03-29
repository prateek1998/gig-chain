import chalk from 'chalk';
import mongoose from 'mongoose';
import Config from './configLoader';

class MongoDBConnector {
  public static async init() {
    try {
      await mongoose.connect(Config.DB.DB_URL); //, Config.DB.options);
      mongoose.set('strictQuery', false);
      console.log(chalk.green('Server successfully connected with Database!'));
    } catch (error) {
      console.log(chalk.red('Server not connected successfully !!!'));
    }
  }
}

export default MongoDBConnector;
