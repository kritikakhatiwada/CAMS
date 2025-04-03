require("dotenv").config(); // Load environment variables
const mysql = require("mysql2/promise"); // Use mysql2 for direct connection

const userIds = Array.from({ length: 19 }, (_, i) => 59 + i); // User IDs 59-77

// Predefined comments for each rating
const comments = {
  1: [
    "Very poor facilities and management.",
    "The worst college experience ever!",
    "Not worth the money, poor faculty.",
    "College lacks proper infrastructure.",
    "Terrible experience, wouldn't recommend.",
    "The college lacks a proper library or research facilities.",
    "No support for students struggling academically.",
    "This college severely lacks proper infrastructure and basic amenities for students.",
    "The faculty is unqualified, and the management is highly disorganized.",
    "There are barely any extracurricular activities or career support for students.",
    "The administration is unresponsive, and issues are never addressed properly.",
    "Most students regret enrolling due to poor academic standards and outdated curriculum.",
    "The college lacks proper sanitation and basic hygiene in its facilities.",
    "The syllabus is outdated, making graduates struggle to compete in the job market.",
    "Administrative staff are rude and unhelpful, making even small tasks frustrating.",
  ],
  2: [
    "Needs a lot of improvement in management.",
    "Some teachers are good, but overall not great.",
    "Campus is okay but services are lacking.",
    "Could be better with better staff.",
    "Not satisfied with the facilities.",
    "The college has some facilities, but they are poorly maintained and rarely upgraded.",
    "While a few professors are knowledgeable, overall teaching quality is inconsistent.",
    "There are limited placement opportunities, and career guidance is almost nonexistent.",
    "Student complaints about classroom conditions and faculty behavior are often ignored.",
    "There are occasional events, but student engagement and overall enthusiasm are low.",
    "The college has potential but suffers from weak management and lack of discipline.",
    "A few teachers are helpful, but most do not put effort into making lessons engaging.",
    "Library resources are outdated, and many essential books are unavailable.",
    "Some clubs and student activities exist, but participation is minimal.",
    "Career counseling is offered, but it is not well-structured or widely promoted.",
  ],
  3: [
    "An average experience, nothing special.",
    "Okay college, but improvements are needed.",
    "Some good aspects, some bad.",
    "Decent education but could be better.",
    "Neutral experience, neither bad nor great.",
    "The college provides decent academic resources, but lacks innovation in teaching methods.",
    "Some professors are excellent, but others do not engage with students effectively.",
    "There are basic sports and extracurricular activities, but they need better organization.",
    "Placements are available for some fields, but overall job opportunities are limited.",
    "The college has a fair reputation, but there’s room for improvement in student support.",
    "The college offers decent facilities, but improvements are needed in student engagement.",
    "Some departments perform well, but others lack strong faculty and infrastructure.",
    "Internship opportunities exist but are limited to specific courses.",
    "The campus environment is generally positive, but student feedback is often ignored.",
    "While academics are fairly strong, industry exposure and practical learning need enhancement.",
  ],
  4: [
    "A good learning environment.",
    "Nice faculty and decent facilities.",
    "Enjoyed my time here, well-organized.",
    "Better than expected, worth considering.",
    "Good college with some minor issues.",
    "This college has great faculty members who genuinely care about students' success.",
    "There are well-maintained classrooms, libraries, and labs for practical learning.",
    "A variety of extracurricular activities help students grow beyond academics.",
    "Placement support is strong, with many reputed companies visiting the campus.",
    "Overall, the college provides a well-rounded education with a focus on both academics and personal growth.",
    "The faculty is approachable and willing to help students outside of class hours.",
    "The curriculum is well-structured, balancing theoretical and practical learning.",
    "Modern lab equipment and technology provide hands-on learning experiences.",
    "The college organizes guest lectures, workshops, and industry visits regularly.",
    "Sports and cultural activities are well-supported, making student life enjoyable.",
  ],
  5: [
    "Excellent college! Highly recommend.",
    "Amazing faculty and great facilities.",
    "One of the best colleges in the region!",
    "Had the best experience, worth every penny!",
    "Outstanding education and supportive staff.",
    "The college fosters a culture of innovation and research, encouraging students to excel.",
    "Scholarship opportunities and financial aid options make education accessible to all.",
    "The alumni network is strong, providing valuable guidance and connections.",
    "Diversity and inclusivity are priorities, creating a welcoming environment for all students.",
    "The campus is beautifully maintained, offering a perfect balance of academics and recreation.",
    "The college excels in academics, extracurriculars, and career opportunities.",
    "Professors are highly experienced and provide exceptional mentorship to students.",
    "Modern infrastructure, digital classrooms, and a well-equipped library make learning seamless.",
    "Top-tier companies recruit students every year, ensuring excellent job placements.",
    "The campus environment is vibrant, inclusive, and fosters overall personality development.",
  ],
};

const generateFeedback = (rating) => {
  return comments[rating][Math.floor(Math.random() * comments[rating].length)];
};

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "165.22.219.64",
      user: process.env.DB_USER || "cams",
      password: process.env.DB_PASSWORD || "C_@W$pro2081",
      database: process.env.DB_NAME || "cams",
      port: process.env.DB_PORT || 9281,
    });

    console.log("✅ Database connected successfully!");
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const insertFeedback = async () => {
  const connection = await connectDB();
  try {
    // Fetch all college IDs from the colleges table
    const [colleges] = await connection.query("SELECT id FROM colleges");

    if (colleges.length === 0) {
      console.log("❌ No colleges found in the database.");
      return;
    }

    // Extract college IDs
    const collegeIds = colleges.map((college) => college.id);

    for (let userId of userIds) {
      // Select a random college ID from the fetched colleges
      const randomCollegeId =
        collegeIds[Math.floor(Math.random() * collegeIds.length)];

      // Generate a random rating between 1 and 5
      const randomRating = Math.floor(Math.random() * 5) + 1;

      // Generate a random comment based on the rating
      const randomComment = generateFeedback(randomRating);

      // Insert into the ratings table
      await connection.query(
        "INSERT INTO ratings (collegeId, userId, rating, comment, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
        [
          randomCollegeId,
          userId,
          randomRating, // Random rating between 1 and 5
          randomComment,
          new Date(), // createdAt
          new Date(), // updatedAt
        ]
      );

      // Now update the avg_rating of the college
      const [collegeRatings] = await connection.query(
        "SELECT rating FROM ratings WHERE collegeId = ?",
        [randomCollegeId]
      );

      const ratings = collegeRatings.map((r) => r.rating);
      const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

      // Update the avg_rating in the college table
      await connection.query(
        "UPDATE colleges SET avg_rating = ? WHERE id = ?",
        [avgRating, randomCollegeId]
      );
    }

    console.log(
      "✅ Ratings and comments inserted, and avg_rating updated successfully!"
    );
  } catch (error) {
    console.error("❌ Error inserting ratings:", error);
  } finally {
    await connection.end(); // Close database connection
    console.log("✅ Database connection closed.");
  }
};

insertFeedback();
