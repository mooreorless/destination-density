import { Schema } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true, index: { unique: true }},
  count: { type: String, required: true },
});

export const country =  database => database.model('countries', schema);
export default country;
