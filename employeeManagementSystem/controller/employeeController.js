import Employee from "../modal/employee.js";
import HttpError from "../middleware/export.js";


const add = async (req, res, next) => {
    try {

        const { name, email, position, department, salary } = req.body;

        const newEmployee = new Employee({
            name,
            email,
            position,
            department,
            salary
        });

        await newEmployee.save();

        res.status(201).json({
            success: true,
            message: "employee added successFully", newEmployee,
        });
    } catch (error) {
        return next(new HttpError("employee not added", 500));
    }
}

const getAllEmployee = async (req,res,next)=>{
    try{

        const employees =await Employee.find();

        if(employees.length === 0){
            return next (new HttpError("employee not found", 404));
        }

        res.status(200).json({
            success:true,
            message:"employee data found", employees,
        });
    }catch(error){
        return next(new HttpError("employee data not found", 500));
    }
}

const getEmployeeById = async (req,res,next)=>{
    try{
        const {id} = req.params;

        const employeeId = await Employee.findById(id);

        console.log(employeeId);

        if(!employeeId){
            return next (new HttpError("employee Id not found", 404));
        }

        res.status(200).json({
            success:true,
            message:"employee id found",employeeId,
        });
    }catch(error){
        return next (new HttpError("employee id not found ",500));
    }
}

const updateEmployee =async (req,res,next)=>{
    try{
        const {id} = req.params;

        const employeeUpdate = await Employee.findByIdAndUpdate(id,req.body,{new:true});

        console.log(employeeUpdate);

        if(!employeeUpdate){
            return next(new HttpError("employee not updated", 400));
        }
        res.status(200).json({
            success:true,
            message:"employee update successFully", employeeUpdate,
        });
    }
    catch(error){
        return next (new HttpError("employee update not found",500));
    }
}

const updateEmployeeManually =async (req,res,next)=>{
    try{
        const {id} = req.params; 

        const employeeUpdate = await Employee.findById(id);

        if(!employeeUpdate){
            return next(new HttpError("employee not updated", 400));
        }

        const updates = Object.keys(req.body);

        const allowedUpdates = ["name","email"];

        const isValidOperation  = updates.every(update=> allowedUpdates.includes(update));

        if(!isValidOperation){
            return next(new HttpError("Invalid update fields", 400));
        }

        updates.forEach(update => employeeUpdate[update] = req.body[update]);

        await employeeUpdate.save();

        res.status(200).json({
            success:true,
        message:"employee update successFully", employeeUpdate,
        });

    }catch(error){
        return next (new HttpError("employee update not found",500));
    }
}

const deleteEmployee = async (req, res, next) => {
    try {
        let { id } = req.params;

        id = id.trim();

        console.log("REQ PARAM ID =>", id);

        const checkEmployee = await Employee.findById(id);
        console.log("FOUND BEFORE DELETE =>", checkEmployee);

        if (!checkEmployee) {
            return next(new HttpError("employee id not found", 404));
        }

        await Employee.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "employee deleted successfully"
        });

    } catch (error) {
        console.log("DELETE ERROR =>", error);
        return next(new HttpError(error.message, 500));
    }
};

const deleteAllEmployee = async (req,res,next)=>{
    try{
    
        const result = await Employee.deleteMany({});

          if (result.deletedCount === 0) {
            return next(new HttpError("No employees found", 404));
        }

        res.status(200).json({
            success:true,
            message:"All employee deleted successfully", deletedCount: result.deletedCount,
        });
    }catch(error){
        return next (new HttpError("employee id not found ",500));
    }
}

export default {
    add,
    getAllEmployee,
    getEmployeeById,
    updateEmployee,
    updateEmployeeManually,
    deleteEmployee,
    deleteAllEmployee,
};



