const CategoryModels = require("../models/categorys");
const uuid = require("uuid/v4");

module.exports = {
  getCategory: function(req, res) {
    CategoryModels.getCategory()
      .then(result => {
        // eslint-disable-next-line max-len
        return res.json({
          status: 200,
          success: true,
          count: result.length,
          message: "success to get all category data",
          data: result
        });
      })
      .catch(err => {
        return res.json({
          status: 400,
          success: false,
          message: "failed to get data " + err
        });
        console.log(err);
      });
  },
  getSingleCategory: function(req, res) {
    const id = req.params.id;
    CategoryModels.getSingle(id)
      .then(result => {
        // eslint-disable-next-line max-len
        return res.json({
          status: 200,
          success: true,
          message: "success to get all category data",
          data: result
        });
      })
      .catch(err => {
        return res.json({
          status: 400,
          success: false,
          message: "failed to get data " + err
        });
        console.log(err);
      });
  },
  addCategory: function(req, res) {
    const id = uuid();
    const { name } = req.body;
    const data = {
      id,
      name
    };
    CategoryModels.verifyCategory(name)
      .then(result => {
        if (result.length != 0) {
          res.json({
            status: 203,
            success: true,
            message: "data already exist!",
            result
          });
        } else {
          CategoryModels.addCategory(data)
            .then(result => {
              res.json({
                status: 200,
                success: false,
                message: "success",
                data
              });
            })
            .catch(err => {
              res.json({
                success: false,
                message: "failed insert category data!",
                err: err
              });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.json({
          message: "failed!",
          err: err
        });
        console.log(err);
      });
  },
  updateCategory: function(req, res) {
    const CategoryID = req.params.CategoryID;
    const name = req.body;
    CategoryModels.updateCategory(name, CategoryID)
      .then(result => {
        res.json({
          status: 200,
          succsess: true,
          message: "success update category",
          data: {
            id: CategoryID,
            name
          }
        });
      })
      .catch(err => {
        res.json({
          message: "faield to update category " + err,
          err
        });
        console.log(err);
      });
  },
  deleteCategory: function(req, res) {
    const CategoryID = req.params.CategoryID;
    CategoryModels.deleteCategory(CategoryID)
      .then(result => {
        res.json({
          status: 200,
          succsess: true,
          message: "success delete category",
          result
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          succsess: false,
          message: "failed delete category data! " + err,
          err: err
        });
        console.log(err);
      });
  }
};
