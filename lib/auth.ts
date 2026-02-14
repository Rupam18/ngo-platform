import jwt from "jsonwebtoken";

export async function isAdmin(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return false;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        return decoded.role === "ADMIN";
    } catch (err) {
        return false;
    }
}
