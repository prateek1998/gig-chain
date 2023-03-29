import Express from './expressLoader';
import Database from './databaseLoader';

class App {
  // Clear the console
  private _clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  public async bootstrap() {
    this._clearConsole();

    // Setup express app
    Express.init();

    // Load database pool
    Database.init();
  }
}

export default App;
