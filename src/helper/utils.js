/* eslint-disable max-len */


module.exports = {
  chekingData: function(res, result, message) {
    if (result.length!=0) {
      res.json({
        count_data: result.length,
        result});
    } else {
      res.json(message);
    }
  },

};
