const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const caseRoutes = require("./routes/cases.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cases", caseRoutes);

app.get("/", (req, res) => {
  res.send("RecoveryIQ Prototype Backend Running");
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
