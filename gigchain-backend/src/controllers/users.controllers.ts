import { Request, Response } from 'express';
import { Service } from 'typedi';
import UserRepo from '/repositories/userRepository';
import Constants from '/utils/constants.utils';
import Status from '/utils/status-codes-messages.utils';
import BaseResponse from '/utils/base-response.utils';

@Service()
class UserController extends BaseResponse {
  private userRepo: UserRepo;
  constructor() {
    super();
    this.userRepo = new UserRepo();
  }

  async addNewUser(req: Request, res: Response) {
    let data: any = req.body;

    let result: any = await this.userRepo.addNewUser(data).catch((reason) => {
      console.error('addNewUser: failed to add User reason - ', reason);
      return this.getDbError(reason);
    });

    if (result.error) {
      this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.gigs.add_db_error_msg));
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.CREATED, result);
  }


  async getAllUsers(req: Request, res: Response) {
    const userData: any = await this.userRepo.getAllUsers().catch(reason => {
      console.error('getAllUsers: Failed to get user reason - ', reason);
      return this.getDbError(reason);
    });

    if (userData.length == Constants.zeroLength) {
      this.sendError(res, Status.ERROR_CODES.gigs.record_not_found_msg);
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, userData);
  }

  async updateUser(req: Request, res: Response) {
    let data: any = req.body;
    const giggerId: string = req.params.giggerId;
    let result: any = await this.userRepo.updateUser(giggerId, data).catch((reason) => {
      console.error('addNewUser: failed to update User reason - ', reason);
      return this.getDbError(reason);
    });

    console.log(result)
    if (result.error) {
      this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.gigs.add_db_error_msg));
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, result);
  }
}

export default UserController;
