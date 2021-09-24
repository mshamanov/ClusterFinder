var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Field from "./Field.js";
import FieldManager from "./FieldManager.js";
import View from "./View.js";
const field = new Field(5);
const fieldManager = new FieldManager();
View.draw(field);
View.showButton("Start", () => start());
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        fieldManager.fillBlankPointsWithRandomNumbers(field);
        View.draw(field);
        while (true) {
            const result = yield repeat();
            if (!result) {
                break;
            }
        }
        View.showButton("Restart", () => {
            fieldManager.fillWithNumber(field, -1);
            start();
        });
    });
}
function repeat() {
    return new Promise(resolve => {
        View.print("Discovering clusters...");
        const clusters = fieldManager.findClusters(field);
        if (clusters.length === 0) {
            View.print("All clusters cleared out!");
            resolve(false);
            return;
        }
        setTimeout(() => {
            View.print(`Clusters found: ${clusters.length}`);
            View.blinkClusters(clusters).then(() => {
                fieldManager.removeClusters(clusters, field);
                View.draw(field);
                setTimeout(() => {
                    View.print("Refilling blank clusters...");
                    fieldManager.dropPointsOnBlankClusters(clusters, field);
                    View.draw(field);
                    setTimeout(() => {
                        fieldManager.fillBlankPointsWithRandomNumbers(field);
                        View.draw(field);
                        resolve(true);
                    }, 700);
                }, 700);
            });
        }, 1000);
    });
}
