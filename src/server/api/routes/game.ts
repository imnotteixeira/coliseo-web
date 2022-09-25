import { Router } from "express";
import { Dog, FightController, MainFighter, Players, Punch } from "@coliseo/engine";

const router = Router();

export default (app: Router) => {
    app.use("/game", router);

    /**
     * Creates a new game
     */
    router.get("/", async (req, res, next) => {

        try {
            const players: Players = {
                0: new MainFighter("John", {attack: 1, defence: 2, health: 100}, [Punch], new Dog("Jarvis", {attack: 2, defence: 1, health: 20})),
                1: new MainFighter("Mick", {attack: 1.2, defence: 1.7, health: 90}, [Punch])
            }
            
            const fightController = new FightController();
            const fight = fightController.createFight(players)
            
            const { winner, fightHistory } = fight.start();
            
            return res.json({winner, fightHistory});
        } catch (err) {
            console.error(err);
            return next(err);
        }
    });
};