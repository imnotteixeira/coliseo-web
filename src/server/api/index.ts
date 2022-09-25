import { Router } from "express";
import game from "./routes/game"

const router = Router();

const ping = (app: Router) => {
    app.use("/ping", router);

    /**
     * Health Check
     */
    router.get("/", async (req, res, next) => {

        res.json({ online: true })
    });
};

export default () => {
    const app = Router();
    ping(app)
    game(app);

    return app;
};