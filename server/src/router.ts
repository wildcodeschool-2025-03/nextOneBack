import express from "express";
const router = express.Router();

// Import des modules.
import gameActions from "./modules/game/gameAction";

// Route publique : visible par tout le monde.
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id/ranking", gameActions.readRanking);

import { hashPassword, verifPassword } from "./middlewares/argonMiddleware";

import verifyToken from "./middlewares/verifyToken";
import connexionActions from "./modules/connexion/connexionActions";
import itemActions from "./modules/item/itemActions";
// Autres modules protégés.
import partyAction from "./modules/party/partyAction";
import userActions from "./modules/user/userActions";

// Auth des routes.
router.post("/api/connexion/register", hashPassword, connexionActions.add);
router.post("/api/connexion/login", verifPassword, connexionActions.read);

router.use(verifyToken);
router.post("/api/connexion/logout", connexionActions.disconnected);
router.get("/api/connexion/profile", connexionActions.profile);

// Routes protégées (favoris, parties, items, etc.)
router.get("/api/partys", partyAction.browse);
router.get("/api/partys/:id", partyAction.read);
router.post("/api/partys", partyAction.add);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import favoriteActions from "./modules/favorite/favoriteActions";

router.get("/api/favorites/:userId", verifyToken, favoriteActions.getAllByUser);
router.post("/api/favorites", verifyToken, favoriteActions.add);
router.delete(
  "/api/favorites/:userId/:gameId",
  verifyToken,
  favoriteActions.remove,
);
router.get("/api/users", userActions.read);

/* ************************************************************************* */

export default router;
