import passport from "passport";
import { Router } from "express";

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

// TODO: Remove after testing
router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
