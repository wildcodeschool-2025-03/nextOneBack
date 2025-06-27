import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import { hashPassword, verifPassword } from "./middlewares/argonMiddleware";
import connexionActions from "./modules/connexion/connexionActions";
router.post("/api/connexion/register", hashPassword, connexionActions.add);
router.post("/api/connexion/login", verifPassword, connexionActions.read);
/* ************************************************************************* */

export default router;
