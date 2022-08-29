import { mongoose } from 'mongoose';

const Apartment = new mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number },
	rooms: { type: Number, required: true },
	description: { type: String },
})

export default mongoose.model('Apartment', Apartment)