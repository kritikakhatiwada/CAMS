const StudentDetails = require("../models/student-detail.model");
const Education = require("../models/students-education.model");
const { Op } = require("sequelize");
const User = require("../models/User.model");
const { getUserRoles } = require("../utils/userRole");
const Application = require("../models/application.model")

/**
 * Create a new student with education details
 * @param {Request} req
 * @param {Response} res
 */
exports.createStudentWithEducation = async (req, res) => {
  const { birthDate, gender, parentName, parentContact, parentEmail, educations } = req.body;
  const userId = req.user.id;
  try {
    // Validate required fields
    if (!birthDate || !gender || !parentName || !parentContact || !parentEmail ) {
      return res.status(400).json({
        message: "All student and parent fields are required",
      });
    }

    // Create the student record
    const student = await StudentDetails.create({
      birthDate,
      gender,
      parentName,
      parentContact,
      parentEmail,
      userId,
    });

    // If educations are provided, create education records
    if (educations && Array.isArray(educations)) {
      const educationPromises = educations.map((education) => {
        return Education.create({
          collegeName: education.collegeName,
          startedYear: education.startedYear,
          PassedYear: education.PassedYear,
          studentId: student.id, // Linking to the student
          degree: education.degree,
          cgpa: education.cgpa,
        });
      });

      // Wait for all education records to be created
      await Promise.all(educationPromises);
    }

    return res.status(201).json({
      success: true,
      message: "Student and education records created successfully",
    }); // Respond with the created student
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


/**
 * Update a student's details and their education records
 * @param {Request} req 
 * @param {Response} res
 */
exports.updateStudentWithEducation = async (req, res) => {
  const { id } = req.params;
  const { birthDate, gender, parentName, parentContact, parentEmail, educations } = req.body;

  try {
    // Find the student by primary key (id)
    const student = await StudentDetails.findByPk(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Update student details (including parent details)
    const updatedStudent = await student.update({
      birthDate: birthDate || student.birthDate,
      gender: gender !== undefined ? gender : student.gender,
      parentName: parentName || student.parentName,
      parentContact: parentContact || student.parentContact,
      parentEmail: parentEmail || student.parentEmail,
    });

    // Update education records if provided
    if (educations && Array.isArray(educations)) {
      // Fetch existing education records
      const existingEducations = await Education.findAll({
        where: { studentId: id },
      });

      // Delete education records that are no longer in the request
      const educationToDelete = existingEducations.filter(
        (existingEducation) =>
          !educations.some(
            (education) => education.collegeName === existingEducation.collegeName
          )
      );

      const deletePromises = educationToDelete.map((edu) => edu.destroy());
      await Promise.all(deletePromises);

      // Create or update education records
      const educationPromises = educations.map(async (education) => {
        const existingEducation = existingEducations.find(
          (edu) => edu.collegeName === education.collegeName
        );

        if (existingEducation) {
          // Update existing education record
          return existingEducation.update({
            startedYear: education.startedYear || existingEducation.startedYear,
            PassedYear: education.PassedYear || existingEducation.PassedYear,
            degree: education.degree || existingEducation.degree,  
            cgpa: education.cgpa || existingEducation.cgpa,
          });
        } else {
          // Create new education record
          console.log("Education Degree",education.degree);
          
          return Education.create({
            collegeName: education.collegeName,
            startedYear: education.startedYear,
            PassedYear: education.PassedYear,
            studentId: student.id,
            degree: education.degree,
            cgpa: education.cgpa,
          });
        }
      });

      await Promise.all(educationPromises);
    }

    res.status(200).json({
      success: true,
      message: "Student and education records updated successfully",
      updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


/**
 * Delete a student and their education records
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteStudentWithEducation = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentDetails.findByPk(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Delete associated education records
    await Education.destroy({ where: { studentId: id } });

    // Delete the student
    await student.destroy();

    res.status(200).json({
      message: "Student and associated education records deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Get all students with their education records
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllStudentsWithEducation = async (req, res) => {
  try {
    const students = await StudentDetails.findAll({
      include: {
        model: Education,
        as: "education",
      },
      
    });

    res.status(200).json({
      message: "Students and education records retrieved successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Get a student with their education records by student ID
 * @param {Request} req
 * @param {Response} res
 */
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentDetails.findByPk(id, {
      include: [
        {
          model: Education,
          as: "education",
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
        }
      ]
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student and education records retrieved successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Get current student details
 * @param {Request} req
 * @param {Response} res
 */

exports.getStudentDetails = async (req, res) => {
  const userId = req.user.id;

  try {

    const userWithRole = await User.findByPk(userId);
    console.log(userWithRole);
    
    const userRoles = await getUserRoles(userWithRole.id);
    console.log(userRoles);
    

    if (!(userRoles === "STUDENT" || (Array.isArray(userRoles) && userRoles.includes("STUDENT")))) {
      return res.status(403).json({
        message: "You are not authorized to view this page",
      });
    }
    

    

    const student = await StudentDetails.findOne({
      where: { userId },
      include: [
        {
          model: Education,
          as: "education",
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
        }
      ]
    });

    res.status(200).json({
      message: "Student details retrieved successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

exports.acceptedCollegeStudents = async (req, res) => {
  try {
    const { collegeId } = req.body;

    // Fetch applications where status is "approved" and belongs to the given college
    const applications = await Application.findAll({
      where: { status: "approved", college_id: collegeId },
      include: [
        {
          model: User,
          as: "student",
        },
      ],
    });

    // Extract student details from applications
    const students = applications.map((app) => app.student);

    res.status(200).json({
      message: "Accepted students retrieved successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
