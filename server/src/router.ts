import express from "express";
const router = express.Router();

// Route publique : visible par tout le monde.
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id/ranking", gameActions.readRanking);

import { hashPassword, verifPassword } from "./middlewares/argonMiddleware";
import { uploadGameImage } from "./middlewares/uploadMiddleware";
import verifyToken from "./middlewares/verifyToken";
import connexionActions from "./modules/connexion/connexionActions";
import favoriteActions from "./modules/favorite/favoriteActions";
import gameActions from "./modules/game/gameAction";
import itemActions from "./modules/item/itemActions";
import partyActions from "./modules/party/partyAction";
import { tarifsActions } from "./modules/tarifs/tarifsActions";
import userActions from "./modules/user/userActions";

// ROUTES PUBLIQUES

// Auth (inscription/connexion)
router.post("/api/connexion/register", hashPassword, connexionActions.add);
router.post("/api/connexion/login", verifPassword, connexionActions.read);

// Jeux : consultation
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id/ranking", gameActions.readRanking);

// Tarifs
router.get("/api/tarifs", tarifsActions.browse);
router.get("/api/events", eventActions.browse);

// ROUTES PROTÉGÉES (Authentification requise)
router.use(verifyToken);
router.put("/api/tarifs/:id", tarifsActions.update);
router.post("/api/connexion/logout", connexionActions.disconnected);
router.delete("/api/connexion/profile", connexionActions.remove);
router.get("/api/connexion/profile", connexionActions.profile);

// Jeux (CRUD Admin)
router.post("/api/games", uploadGameImage, gameActions.add);
router.put("/api/games/:id", uploadGameImage, gameActions.update);
router.delete("/api/games/:id", gameActions.destroy);

// Tarifs (Admin)
router.put("/api/tarifs/:id", tarifsActions.update);

// Parties
router.get("/api/partys", partyActions.browse);
router.get("/api/partys/:id", partyActions.read);
router.post("/api/partys", partyActions.add);

// Items
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import { adminAuth, userAuth } from "./middlewares/authMiddleware";
import { valideDataEvent, valideEventId } from "./middlewares/event";
import { eventActions } from "./modules/event/eventActions";
import playerScoreAction from "./modules/playerScore/playerScoreAction";
router.get("/api/playerScored", playerScoreAction.read);

router.get("/api/favorites/:userId", verifyToken, favoriteActions.getAllByUser);
router.get("/api/myfavorites", favoriteActions.read);
router.post("/api/favorites", verifyToken, favoriteActions.add);
router.delete(
  "/api/favorites/:userId/:gameId",
  verifyToken,
  favoriteActions.remove,
);

// Utilisateurs
router.get("/api/users", userActions.read);

router.post(
  "/api/events/:id/register",
  userAuth,
  valideEventId,
  eventActions.register,
);
router.delete(
  "/api/events/:id/register",
  userAuth,
  valideEventId,
  eventActions.cancel,
);

router.get("/api/events/:id", valideEventId, eventActions.read);
router.post("/api/events", adminAuth, valideDataEvent, eventActions.add);
router.put("/api/events/:id", adminAuth, valideDataEvent, eventActions.update);
router.delete("/api/events/:id", adminAuth, valideEventId, eventActions.remove);

/* ************************************************************************* */

export default router;
