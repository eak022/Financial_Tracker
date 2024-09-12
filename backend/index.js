const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// อ่านค่าตัวแปรสภาพแวดล้อม
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.Font_URL ? process.env.Font_URL.split(',') : [];

// กำหนดค่า CORS
const corsOptions = {
  origin: function (origin, callback) {
    // ถ้าไม่มี origin (เช่น requests ภายใน) หรืออยู่ในรายการที่อนุญาต
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// ใช้งาน middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route หลัก
app.get("/", (req, res) => {
  res.send("<h1>Hello FinancialTracker API</h1>");
});

// Router ของ financial
const financialRouter = require("./router/financial.router");
app.use("/api/v1/financial", financialRouter);

// เริ่มต้น server
app.listen(PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});
