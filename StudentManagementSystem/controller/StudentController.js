import HttpError from "../middleware/export.js";
import student from "../modal/student.js";

// Add Student
const add = async (req, res, next) => {
  try {
    const { name, grId, email, course, isActive, mobileNumber } = req.body;

    const newStudent = new student({
      name,
      grId,
      email,
      course,
      isActive,
      mobileNumber,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      newStudent,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get All Students
const getAllStudentData = async (req, res, next) => {
  try {
    const students = await student.find({});

    if (students.length <= 0) {
      return res.status(200).json({
        success: true,
        message: "No student found",
      });
    }

    res.status(200).json({
      success: true,
      total: students.length,
      students,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get Student By ID
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentData = await student.findById(id);

    if (!studentData) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json({
      success: true,
      studentData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Delete Student
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedStudent = await student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Update Student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedStudentData = await student.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedStudentData) {
      return next(new HttpError("Student not updated", 400));
    }

    res.status(200).json({
      success: true,
      updatedStudentData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Manual Update
const updateDataManually = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentUpdate = await student.findById(id);

    if (!studentUpdate) {
      return next(new HttpError("Student not found", 404));
    }

    const updates = Object.keys(req.body);
    const allowedFields = ["name", "email", "mobileNumber"];

    const isValidUpdate = updates.every((u) =>
      allowedFields.includes(u)
    );

    if (!isValidUpdate) {
      return next(
        new HttpError("Only name, email, mobileNumber update allowed", 400)
      );
    }

    updates.forEach((update) => {
      studentUpdate[update] = req.body[update];
    });

    await studentUpdate.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      studentUpdate,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Delete All Students
const deleteAllData = async (req, res, next) => {
  try {
    await student.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All students deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllStudentData,
  getStudentById,
  deleteStudent,
  updateStudent,
  updateDataManually,
  deleteAllData,
};