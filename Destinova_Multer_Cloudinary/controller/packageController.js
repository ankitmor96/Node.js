import Packages from "../model/packageModel.js";
import HttpError from "../middleware/HttprError.js"

const add = async (req,res,next)=>{
      try{
        const {PackageName,PackagePrice,StartDate,EndDate,Duration,Destination,PackageType} = req.body;

        console.log(req.body);
    

        if(!PackageName || !PackagePrice || !StartDate || !EndDate || !Duration || !Destination || !PackageType){
            return next(new HttpError("packages data not found",404));
        }

        const PackageImages = req.file.path;

        console.log(req.file);

        const newPackages = new Packages({

            PackageName,
            PackagePrice,
            StartDate,
            EndDate,
            Duration,
            Destination,
            PackageType,
            PackageImages:req.file.path

        });

        await newPackages.save();

        res.status(201).json({
            success:true,
            message:"new package data add successFully",
            data:newPackages
        });


      }catch(error){
        return next (new HttpError("route not found",500));
      }
};

const getAllPackages = async (req,res,next)=>{
  try{

    const packages = await Packages.find({});

    if(packages.length === 0){
      return next (new HttpError("packages data not found",404));
    }

    res.status(200).json({
      success:true,
      message:"packages data found",
      data:packages
    });
  }catch(error){
    return next (new HttpError("route not found",500));
  }
};

const getPackagesById = async(req,res,next)=>{
  try{

    const {id} = req.params;

    const getById = await Packages.findById(id);

    if(!getById){
      return next (new HttpError("packages id not found",404));
    }

    res.status(200).json({
       success:true,
       message:"packages id found",
       data:getById
    });
  }catch(error){
    return next (new HttpError("route not found",500));
  }
};
export default {add , getAllPackages , getPackagesById};