import { Request, Response } from 'express';
import { Service } from 'typedi';
import GigRepo from '/repositories/gigRepository';
import Constants from '/utils/constants.utils';
import Status from '/utils/status-codes-messages.utils';
import BaseResponse from '/utils/base-response.utils';

@Service()
class GigController extends BaseResponse {
  private gigRepo: GigRepo;
  constructor() {
    super();
    this.gigRepo = new GigRepo();
  }

  async addNewGig(req: Request, res: Response) {
    let data: any = req.body;

    let result: any = await this.gigRepo.addNewGig(data).catch((reason) => {
      console.error('addNewGig: failed to add Gig reason - ', reason);
      return this.getDbError(reason);
    });
    
    if (result.error) {
      this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.gigs.add_db_error_msg ));  
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.CREATED, result);
  }

  async getAllGigs(req: Request, res: Response) {
    const gigData: any = await this.gigRepo.getAllGigs().catch(reason => {
      console.error('getAllGigs: Failed to get gig reason - ', reason);
      return this.getDbError(reason);
    });

    if (gigData.length == Constants.zeroLength) {
      this.sendError(res, Status.ERROR_CODES.gigs.record_not_found_msg);
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, gigData);
  }
  
  async updateGig(req: Request, res: Response) {
    let data: any = req.body;
    const gigId: string = req.params.gigId;

    // let result: any = await this.gigRepo.updateGig(data, gigId).catch((reason) => {
    //   console.error('updateClassification: Failed to update Classification reason - ', reason);
    //   Logger.error("updateClassification: " + reason);
    //   return this.getDbError(reason);
    // });
    // if (result.error) {
    //   this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.classification.update_db_error_msg));  
    //   return;
    // }

    // if (result[Constants.zeroLength] == Constants.zeroLength) {
    //   this.sendError(res, Status.ERROR_CODES.classification.update_invalid_id_msg);
    //   return;
    // }

    // this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, result);
  }

  async assignGigs(req: Request, res: Response) {
    let data: any = req.body;
    const gigId: string = req.params.gigId;
    let assignedUsers = data.assignedUsers;
    let gigIdsArr = [];
    assignedUsers.forEach(user => {
      gigIdsArr.push(user._id)
    });
    let result: any = await this.gigRepo.assignGigs(gigIdsArr, gigId).catch((reason) => {
      console.error('addNewUser: failed to add User reason - ', reason);
      return this.getDbError(reason);
    });
    
    if (result.error) {
      this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.gigs.add_db_error_msg ));  
      return;
    }

    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, result);
  }
}

export default GigController;
