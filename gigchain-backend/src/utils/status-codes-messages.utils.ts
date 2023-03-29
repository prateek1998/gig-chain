export default class StatusMessage {
  static readonly HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  static readonly SERVER_ERRORS = {
    internal_error: 'Internal Error',
    rate_limit_reached: 'Rate limt exceeded, please try again later some time.',
    missing_field_failed: 'Required Field is missing',
    queryDate: 'Both start date and end date are required',
    queryDateFormat: 'Date should be in YYYY/MM/DD format',
    queryStartDateBetweenEndDate: 'Start date should be less than end date',
    querySort: 'Both sortBy and sort order are required',
    db_error: 'Database connection issues',
    no_information_provided: 'No Information provided to update',
    only_image_allowed: 'Only .png, .jpg and .jpeg format allowed!',
    only_csv_allowed: 'Only .csv format allowed!',
    Unexpected_field: 'Unexpected field',
    file_key_error: 'Upload file key name not correct',
    csv_file_not_found: 'CSV file not found',

    gigs: {
      // name_not_found: 'Classification Name is missing',
      // name_type: 'Classification name type should be string',
      // name_length: 'Classification Name length should be in 3 to 200 characters',
      // priority_not_found: 'Classification priority is missing',
      // priority_type: 'Classification Priority type should be number',
      // record_not_found: 'Classification record not found',
      // invalid_id: 'Invalid Classification Id',
      add_failed: 'Failed to add new gig',
      get_failed: 'Failed to fetch gig',
      update_failed: 'Failed to update the gig',
      delete_failed: 'Failed to delete the gig',
    },
  };

  static readonly ERROR_CODES = {
    internal_error_msg: [1001, StatusMessage.SERVER_ERRORS.internal_error, 500],
    gigs: {
      record_not_found_msg: [1002, StatusMessage.SERVER_ERRORS.gigs.get_failed, 500],
      // information_not_provided_msg: [1007, StatusMessage.SERVER_ERRORS.classification.update_failed, 400],
      // name_not_found_msg: [1008, StatusMessage.SERVER_ERRORS.missing_field_failed, 400],
      // priority_not_found_msg: [1018, StatusMessage.SERVER_ERRORS.missing_field_failed, 400],
      // name_type_msg: [1021, StatusMessage.SERVER_ERRORS.classification.add_failed, 400],
      // priority_type_msg: [1022, StatusMessage.SERVER_ERRORS.classification.add_failed, 400],
      // name_length_msg: [1023, StatusMessage.SERVER_ERRORS.classification.add_failed, 400],
      add_db_error_msg: [1024, StatusMessage.SERVER_ERRORS.gigs.add_failed, 500],
      get_db_error_msg: [1024, StatusMessage.SERVER_ERRORS.gigs.get_failed, 500],
      update_db_error_msg: [1024, StatusMessage.SERVER_ERRORS.gigs.update_failed, 500],
      delete_db_error_msg: [1024, StatusMessage.SERVER_ERRORS.gigs.delete_failed, 500],
      get_invalid_id_msg: [1029, StatusMessage.SERVER_ERRORS.gigs.get_failed, 400],
      update_invalid_id_msg: [1029, StatusMessage.SERVER_ERRORS.gigs.update_failed, 400],
      delete_invalid_id_msg: [1029, StatusMessage.SERVER_ERRORS.gigs.delete_failed, 400],
    },
  };

  static readonly SERVER_SUCCESS = {
    gigs: {
      data_added: 'Classification data saved successfully',
      data_fetched: 'Classification data fetched successfully',
      data_updated: 'Classification data updated successfully',
      data_deleted: 'Classification data delete successfully',
    }
  };

  static readonly DB_ERRORS = {
    uniqueConstantError: 'MongoDBUniqueConstraintError',
    validationError: 'MongoServerError',
    accessDeniedError: 'MongoDBAccessDeniedError',
    MongoDBConnectionError: 'MongoDBConnectionError',
  };


  static readonly DB_LOGS = {
    DB_CONNECTED_SYNC_SUCCESS_MSG: '####### Database connected and synced successfully #######',
  };
}
