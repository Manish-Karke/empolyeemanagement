const EmpolyeeModel = require("../model/empolyeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.image = req.body ? req.file?.path : null;
    console.log(body);
    const emp = new EmpolyeeModel(body);
    await emp.save();
    res.status(200).json({
      message: "Empolyee created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error,
      success: false,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { name, phone, salary, department, email } = req.body;
    const { id } = req.params;
    console.log(id);
    let updateData = {
      name,
      phone,
      salary,
      department,
      email,
      updateDate: new Date(),
    };
    console.log("<-- update ---> ", req.file);
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedData = await EmpolyeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({
        message: "empolyee not found",
      });
    }

    res.status(200).json({
      message: "Empolyee created",
      success: true,
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error,
      success: false,
    });
  }
};
const getAllEmployee = async (req, res) => {
  try {
    // Get page and limit from query parameters
    let { page, limit, search } = req.query;

    // Set default values if they are not provided
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Build the search criteria
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // case insensitive
        },
      };
    }
    // Get the total number of employees for pagination info
    const totalEmployees = await EmpolyeeModel.countDocuments(searchCriteria);

    // Fetch the employees with pagination
    const emps = await EmpolyeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    // Calculate total pages
    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};
const getEmpolyeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmpolyeeModel.findOne({ _id: id });
    if (!emp) {
      res.status(401).json({
        message: "empolyee is not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Empolyee is found",
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error,
      success: false,
    });
  }
};
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmpolyeeModel.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Empolyee is deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error,
      success: false,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmpolyeeById,
  deleteById,
  updateEmployee,
};
