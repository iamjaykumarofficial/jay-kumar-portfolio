import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Yahan baad me MySQL / Email add kar sakte ho
    console.log("New contact message:", { name, email, message });

    return res.status(200).json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;