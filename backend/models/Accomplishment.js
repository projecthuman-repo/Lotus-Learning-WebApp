const mongoose = require('mongoose');

const accomplishmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  //   picture {

  //   }
});

const Accomplishment = mongoose.model('Accomplishment', accomplishmentSchema);

module.exports = Accomplishment;
