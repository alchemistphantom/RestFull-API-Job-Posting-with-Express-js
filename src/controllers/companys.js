const companyModels = require("../models/companys");
const uuid = require("uuid/v4");
const utils = require("../helper/utils");
const deleteFile = require("../helper/delFile");
const path = require("path");

module.exports = {
  getCompany: function(req, res) {
    companyModels
      .getCompany()
      .then(result => {
        res.json({
          status: 200,
          success: true,
          count: result.length,
          message: "succsesssfully get all company data",
          data: result
        });
        // utils.chekingData(res, result, ' data company is empty');
      })
      .catch(err => {
        res.status(400).json("failed to get data");
        console.log(err);
      });
  },
  addCompany: function(req, res) {
    const id = uuid();
    const { name, location, description } = req.body;
    const host = req.hostname;
    if (!req.file) {
      res.json({
        status: 401,
        success: false,
        message: "please select an image to upload!"
      });
      return;
    }
    const ext = path.extname(req.file.filename);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      res.json({
        status: 401,
        success: false,
        message: "Only image file!"
      });
      return;
    }
    const logo =
      req.protocol +
      "://" +
      host +
      ":" +
      process.env.PORT +
      "/src/images/" +
      req.file.filename;
    const data = {
      id,
      name,
      logo,
      location,
      description
    };
    companyModels
      .verifyCompany(name)
      .then(result => {
        if (result.length != 0) {
          res.json({
            status: 201,
            success: true,
            message: "data already exist!",
            data
          });
        } else {
          companyModels
            .addCompany(data)
            .then(result => {
              res.json({
                status: 200,
                success: true,
                message: "success insert company data",
                data
              });
            })
            .catch(err => {
              res.json({
                status: 400,
                success: false,
                message: "failed insert company data! " + err,
                err: err
              });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          success: false,
          message: "failed!" + err,
          err: err
        });
        console.log(err);
      });
  },
  updateCompany: function(req, res) {
    const companyID = req.params.companyID;
    const host = req.hostname;
    let logos = "";
    //cek data company
    companyModels.verifyCompanyId(companyID).then(result => {
      if (result.length === 0) {
        res.status(401).json({
          success: false,
          message: "Data not exist",
          result
        });
        return;
      }
      let { id, name, logo } = result[0];
      let paths = path.basename(logo).toString();
      if (req.file) {
        // res.json({
        //   status: 401,
        //   success: false,
        //   message: "please select an image to upload!"
        // });

        //cek file type
        const ext = path.extname(req.file.filename);
        if (
          ext !== ".png" &&
          ext !== ".jpg" &&
          ext !== ".gif" &&
          ext !== ".jpeg"
        ) {
          res.json({
            status: 401,
            success: false,
            message: "Only image file!"
          });
          return;
        }
        //set  logo filename
        logos =
          req.protocol +
          "://" +
          host +
          ":" +
          process.env.PORT +
          "/src/images/" +
          req.file.filename;
        console.log("print logos :" + logos);
        deleteFile("src/images/" + paths)
          .then(resultFile => {})
          .catch(errFile => {
            console.log(errFile);
          });
      } else logos = logo;

      //input logo on data
      req.body.logo = logos;
      const data = req.body;

      companyModels
        .updateCompany(data, companyID)
        .then(() => {
          res.json({
            status: 200,
            success: true,
            message: "success update company",
            Updated: data
          });
        })
        .catch(err => {
          res.json({
            status: 400,
            success: false,
            message: "faield to update company",
            err
          });
          console.log(err);
        });
    });
  },
  deleteCompany: function(req, res) {
    const companyID = req.params.companyID;
    companyModels.verifyCompanyId(companyID).then(result => {
      console.log(result);
      if (result.length === 0) {
        res.status(401).json({
          success: false,
          message: "Data not exist",
          result
        });

        return;
      }
      const { id, name, logo } = result[0];
      let paths = path.basename(logo).toString();
      console.log(paths);
      deleteFile("src/images/" + paths)
        .then(resultFile => {
          companyModels
            .deleteCompany(companyID)
            .then(result => {
              return res.status(200).json({
                success: true,
                message: "success delete company",
                file: resultFile,
                result: data
              });
            })
            .catch(err => {
              res.json({
                status: 400,
                success: false,
                message: "failed delete company data!",
                err: err
              });
              console.log(err);
            });
        })
        .catch(errFile => {
          console.log(errFile);
        });

      const data = {
        id,
        name,
        logo
      };
    });
  }
};
