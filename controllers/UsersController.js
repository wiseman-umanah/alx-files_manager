import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';

const userQueue = new Queue('userQueue');

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).send({ error: 'Missing email' });

    if (!password) { return response.status(400).send({ error: 'Missing password' }); }

    const emailExists = await dbClient.usersCollection.findOne({ email });

    if (emailExists) { return response.status(400).send({ error: 'Already exist' }); }

    const sha1Password = sha1(password);

    let result;

    dbClient.usersCollection.insertOne({ email, password: sha1Password }, (err, res) => {
      if (err) {
        userQueue.add({}, (queueErr) => {
          if (queueErr) {
            console.error('Error adding to queue:', queueErr);
          }
          response.status(500).send({ error: 'Error creating user.' });
        });
      } else {
        result = res;
      }
    });

    const user = {
      id: result.insertedId,
      email,
    };

    await userQueue.add({
      userId: result.insertedId.toString(),
    });

    return response.status(201).send(user);
  }
}

module.exports = UsersController;
