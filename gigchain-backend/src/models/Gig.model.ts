import mongoose, { Schema } from 'mongoose';
import Users from './Users.model';

const GigSchema = new Schema({
    gigId: {
        type: String,
        unique: true,
        required: true
    }, 
    gigType: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    assigned: [{
        type: Schema.Types.ObjectId,
        ref: Users,
        status: {
            type: String
        }
    }],
}, { timestamps: true });

const GigsModel = mongoose.model('gigs', GigSchema);

export default GigsModel;