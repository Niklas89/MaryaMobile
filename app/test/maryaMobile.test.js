import "dotenv/config";
import axios from "../api/axios";

describe("Login", () => {
  const data = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  };

  it("should login to API", async () => {
    const login = await axios
      .post("auth/login", data)
      .then((res) => res.status);
    await expect(login).toBe(200);
  });
});
