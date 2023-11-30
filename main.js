import { updateAttendance } from "./services/attendance.service.js";
import { generateAuthenticationTokens } from "./services/auth.service.js";

exports.handler = async (event, context) => {
  try {
    await generateAuthenticationTokens();
    await updateAttendance();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Lambda execution successful",
      }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };
  }
};
