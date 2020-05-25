const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
  bpm: {type: Number},
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;