
export const authorize = (roles) => {
    return (req, res, next) => {
        console.log("User in authorize middleware:", req.user);  // Log the user object

      const userRole = req.user?.role;  // Assuming `role` is stored in the `user` object from `verifyJWT`
  
      if (!userRole) {
        return res.status(403).json({ message: "Access denied, user role not found" });
      }
      const doesrole=roles.includes(userRole)
      console.log("doesrole",doesrole)
      if (!doesrole) {
        return res.status(403).json({ message: "Access denied, insufficient permissions" });
      }
  
      next();  // User has valid role, continue to the next middleware or route handler
    };
  };
  