import StatusMessage from "./status-codes-messages.utils";

interface IResponse<T> {
  success: boolean;
  errorCode: number | string;
  message: string | number;
  data: T | undefined;
}

export default class BaseResponse {
  private response: IResponse<any> = {
    success: false,
    errorCode: 0,
    message: '',
    data: {},
  };

  protected getError(code: string | number, message: string | number): any {
    this.response.errorCode = code;
    this.response.message = message;
    return this.response;
  }

  protected sendError(res: any, error: (string | number)[]) {
    this.response.success = false;
    delete this.response.data;
    const errorObj = this.getError(error[0], error[1]);
    res.status(error[2]).send(errorObj);
  }

  protected sendSuccess(res: any, statusCode: string | number, data: any) {
    this.response.success = true;
    this.response.data = data;
    delete this.response.errorCode;
    delete this.response.message;
    res.status(statusCode).send(this.response);
  }

  protected getDbError(reason: any) {
    let errCode: number;
    switch (reason.name) {
      case StatusMessage.DB_ERRORS.accessDeniedError:
        errCode = 1024;
        break;
      case StatusMessage.DB_ERRORS.uniqueConstantError:
        errCode = 1062;
        break;
      case StatusMessage.DB_ERRORS.validationError:
        errCode = 1063;
        break;
      case StatusMessage.DB_ERRORS.MongoDBConnectionError:
        errCode = 1064;
        break;
      default:
        errCode = 1001;
        break;
    }
    return {
      error: true,
      errCode,
    };
  }

  protected getModifiedError(err: any, errMsg: Array<any>) {
    errMsg[0] = err.errCode;
    return errMsg;
  }

}
