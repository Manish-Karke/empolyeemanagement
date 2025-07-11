const {
  createEmployee,
  getAllEmployee,
  getEmpolyeeById,
  deleteById,
  updateEmployee
} = require("../controller/empolyeeControlller");

const cloudinaryfileUploader = require("../middleware/fileUploader");

const empRoutes = require("express").Router();

empRoutes.get("/", getAllEmployee);
empRoutes.get("/:id", getEmpolyeeById);
empRoutes.delete("/:id",deleteById)
// empRoutes.post("/", (req, res) => {
//   res.send("this is from posr");
// });
empRoutes.post("/", cloudinaryfileUploader.single("image"), createEmployee);
empRoutes.put("/:id", cloudinaryfileUploader.single("image"), updateEmployee);

module.exports = empRoutes;
