var decon = require('./../../debugLog.js');
decon.log("Loading Serverside companies.js");
var mongoose = require('mongoose'),
    Company = mongoose.model('Company');


function CompaniesController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           My Controller Method
  // -------------------------------------------------------------------------
  _this.index = function(req, res){
    decon.log('got to the server controller and about to search for companies in DB');
    Company.find({}).populate('products').exec(function(err,result){
      if(err){
        decon.log('there was an error finding companies',err);
        res.json(err);
      } else {
        decon.log('successfully found companies', result);
        res.json(result);
      }
    });
  };
  _this.findCompany = function(req, res){
    decon.log('got to the server controller and about to serach for company with id',req.params);
    Company.findById(req.params.company_id).populate('products').exec(function(err,result){
      if(err){
        decon.log('there was an error finding company',err);
        res.json(err);
      } else {
        decon.log('successfully found company',result);
        res.json(result);
      }
    });
  };
  _this.create = function (req, res) {
    decon.log('got to the server controller with company data ',req.body);
    Company.create(req.body,function(err,result){
      if(err){
        decon.log('there was an error creating company',err);
        res.json(err);
      } else {
        decon.log('successfully created company ',result);
        res.json(result);
      }
    });
  };
  _this.addProduct = function(req,res){
    decon.log('got to the server controller with the product data ',req.body);
    Company.update({_id:req.body._company},{$push:{'products':req.body}},function(err,result){
      if(err){
        decon.log('there was an error updating company',err);
        res.json(err);
      } else {

        Company.findById(req.body._company,function(err,result){
          if(err){
            decon.log('error!',err);
            res.json(err);
          } else {
            decon.log('FOUND TEH COMPENEH',result);
            res.json(result);
          }
        });
      }
    });
  };
  _this.show = function(req,res){
    decon.log('got to the server with company id ', req.body);
    Company.findOne({_id: req.body}, function(err,result){
      if (err){
        decon.log('error showing company');
      } else {
        decon.log('successfully got company ', result);
        res.json(result);
      }
    });
  };
}

module.exports = new CompaniesController();
