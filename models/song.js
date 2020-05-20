const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  urlPath: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;