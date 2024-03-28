import jwt from "jsonwebtoken";

class JwtService {
  static sign(
    payload: any,
    expiry: string = "1h",
    secret: any = process.env.JWT_SECRET
  ): string {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

export default JwtService;
