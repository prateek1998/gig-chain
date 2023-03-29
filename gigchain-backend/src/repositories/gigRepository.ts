import Gigs from '/models/Gig.model';

export default class GigRepo {

  addNewGig(data) {
    return Gigs.create(data)
  }

  getAllGigs() {
    return Gigs.find().populate('assigned');
  }

  assignGigs(gigIdsArr, gigId) {
    return Gigs.findOneAndUpdate({gigId: gigId}, {assigned: gigIdsArr});
  }
}
