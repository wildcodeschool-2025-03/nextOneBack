import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import partyAction from "./modules/party/partyAction";

router.get("/api/partys", partyAction.browse);
router.get("/api/partys/:id", partyAction.read);
router.post("/api/partys", verifyToken, partyAction.add);

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import { hashPassword, verifPassword } from "./middlewares/argonMiddleware";
import verifyToken from "./middlewares/verifyToken";
import connexionActions from "./modules/connexion/connexionActions";

router.post("/api/connexion/register", hashPassword, connexionActions.add);
router.post("/api/connexion/login", verifPassword, connexionActions.read);
router.use(verifyToken);
router.get("/api/connexion/profile", (req, res) => {
  res.json({
    message: `bienvenue utilisateur ${req.auth?.sub}`,
  });
});
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
