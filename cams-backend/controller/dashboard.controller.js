const College = require('../models/college.model');
const Application = require('../models/application.model');
const Course = require('../models/courses.model');
const Rating = require('../models/ratings.model');

exports.getDashboardStatsAdmin = async (req, res) => {
    try {
        // Fetch all colleges with their courses
        const colleges = await College.findAll({
            include: [{ model: Course, as: "courses" }]
        });

        // Process colleges to fetch application stats and ratings
        const collegeStats = await Promise.all(colleges.map(async (college) => {
            // Count total applications received for the college
            const totalApplications = await Application.count({ where: { college_id: college.id } });

            // Count approved applications for the college
            const approvedApplications = await Application.count({ where: { college_id: college.id, status: "approved" } });

            // Count total reviews (ratings) for the college
            const totalReviews = await Rating.count({ where: { collegeId: college.id } });

            return {
                collegeId: college.id,
                collegeName: college.name,
                totalCourses: college.courses.length,
                totalApplications,
                approvedApplications,
                totalReviews
            };
        }));

        res.status(200).json({ success: true, data: collegeStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


exports.getDashboardStatsCollege = async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID

        // Find the college that belongs to this user
        const college = await College.findOne({
            where: { belongsTo: userId },
            include: [{ model: Course, as: "courses" }]
        });

        if (!college) {
            return res.status(404).json({ success: false, message: "College not found" });
        }

        // Count total applications received for this college
        const totalApplications = await Application.count({ where: { college_id: college.id } });

        // Count approved applications for this college
        const approvedApplications = await Application.count({ where: { college_id: college.id, status: "approved" } });

        // Count total reviews (ratings) for this college
        const totalReviews = await Rating.count({ where: { collegeId: college.id } });

        // Create response object
        const collegeStats = {
            collegeId: college.id,
            collegeName: college.name,
            totalCourses: college.courses.length,
            totalApplications,
            approvedApplications,
            totalReviews
        };

        res.status(200).json({ success: true, data: collegeStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
