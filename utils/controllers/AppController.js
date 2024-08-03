import redisClient from '../redis';
import dbClient from '../db';

class AppController {
  static getStatus(request, response) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      response.status(200).json({ redis: true, db: true });
    }
  }

  static getStats(req, res) {
    dbClient.nbUsers()
      .then((users) => dbClient.nbFiles().then((files) => {
        res.status(200).json({ users, files });
      }));
  }
}

module.exports = AppController;
