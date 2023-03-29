import User from '/models/Users.model';

export default class UserRepo {

  addNewUser(data) {
    return User.create(data)
  }

  getAllUsers() {
    return User.find();
  }

  updateUser(giggerId, data) {
    return User.findOneAndUpdate({giggerId: giggerId}, {giggerId: data.giggerId, name: data.name })
  }

}
