import mongoose from 'mongoose';

const invitedTalkSchema = new mongoose.Schema({
  title: String,
  venue: String,
  date:  String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('InvitedTalk', invitedTalkSchema);
