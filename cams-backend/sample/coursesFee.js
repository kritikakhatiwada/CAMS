require("dotenv").config(); // Load environment variables
const mysql = require("mysql2/promise"); // Use mysql2 for direct connection
const axios = require("axios"); // Use axios for making HTTP requests
const url = process.env.URL || "http://localhost:3000"; 
// Individual course fee values
const courseFees = {
  "Science": [120000, 115000, 125000],
  "Management": [86000, 95000, 87000],
  "Humanities": [70000, 75000, 68000],
  "Law": [70000, 71000, 69000],
  "BSc.CSIT": [1000000, 950000, 1050000],
  "BCA": [500000, 510000, 480000],
  "Bachelor of Business Management (BBM)": [800000, 850000, 780000],
  "Bachelor of Social Work (BSW)": [600000, 620000, 590000],
  "Bachelor of Arts (BA)": [500000, 490000, 510000],
  "Bachelor of Business Administration (BBA)": [950000, 940000, 960000],
  "Bachelor of Arts in Social Work (BASW)": [600000, 610000, 590000],
  "BIM": [700000, 710000, 690000],
  "BIT": [1000000, 990000, 1020000],
  "Mechanical Engineering": [1200000, 1150000, 1250000],
  "Electrical Engineering": [1100000, 1080000, 1120000],
  "Civil Engineering": [1100000, 1130000, 1080000],
  "Computer Engineering": [1200000, 1180000, 1220000],
  "Architecture": [1000000, 980000, 1020000],
  "Chemical Engineering": [1150000, 1120000, 1180000],
  "BTech Food Technology": [900000, 890000, 910000],
  "BSc (Hons) Computing with Artificial Intelligence": [1200000, 1220000, 1180000],
  "BSc (Hons) Computer Networking & IT Security": [1100000, 1120000, 1080000],
  "BSc (Hons) Computing": [1150000, 1140000, 1160000],
  "BA (Hons) Business Administration": [950000, 940000, 960000],
  "BSc (Hons) Multimedia Technologies": [1000000, 1020000, 980000],
  "BA (Hons) Accounting & Finance": [950000, 940000, 960000],
  "Bachelor of Travel and Tourism Management (BTTM)": [800000, 810000, 790000],
  "Bachelor of Information Management (BIM)": [900000, 880000, 910000],
  "Bachelor of Science in Computer Science and Information Technology (BSc. CSIT)": [1000000, 1050000, 980000],
  "Bachelor of Science in Computer Science and Information Technology (BSc CSIT)": [1000000, 990000, 1030000],
  "BBA": [950000, 940000, 960000],
  "BBS": [850000, 860000, 840000],
  "BA": [500000, 490000, 510000],
  "SW": [600000, 610000, 590000],
  "Bachelor of Hotel Management (BHM)": [900000, 920000, 880000],
  "Bachelor of Science in Microbiology": [800000, 790000, 810000],
};

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "165.22.219.64",
      user: "cams",
      password: "C_@W$pro2081",
      database: "cams",
      port: 9281,
    });

    console.log("✅ Database connected successfully!");
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const updateCourseFees = async () => {
  const connection = await connectDB();
  try {
    const createdAt = new Date();
    const updatedAt = new Date();

    for (const [course, fees] of Object.entries(courseFees)) {
      const randomFee = fees[Math.floor(Math.random() * fees.length)]; // Randomly select a fee from the array

      // Construct SQL query to update fee for each course
      const sql = `
        UPDATE cams.courses
        SET fee = ?
        WHERE name = ?
      `;

      // Execute the query for each course
      await connection.query(sql, [randomFee, course]);

      
      console.log(`✅ Successfully updated fee for ${course} to ${randomFee}`);

     
    }

  } catch (error) {
    console.error("❌ Error updating course fees:", error);
  } finally {
    await connection.end(); // Close the database connection
    console.log("✅ Database connection closed.");
  }
};

updateCourseFees();
