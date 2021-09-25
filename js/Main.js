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
import Utils from "./Utils.js";
const field = new Field(5);
const fieldManager = new FieldManager(4);
View.showField(field);
View.showButton("Start", () => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
}));
/**
 * Starts the application
 */
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        let firstRun = true;
        while (true) {
            const repeat = yield action(firstRun);
            if (firstRun) {
                firstRun = false;
            }
            if (!repeat) {
                break;
            }
        }
        View.showButton("Restart", () => __awaiter(this, void 0, void 0, function* () {
            fieldManager.fillAllWithNumber(field, -1);
            yield start();
        }));
    });
}
/**
 * Process the field to find all the clusters
 *
 * @param firstRun is the function being called for the first time
 */
function action(firstRun) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        if (firstRun) {
            fieldManager.fillBlankWithRandomNumbers(field);
            View.showField(field);
        }
        View.showMessage("Discovering clusters...");
        const clusters = fieldManager.findClusters(field);
        if (clusters.length === 0) {
            if (firstRun) {
                View.showMessage("No clusters found!");
            }
            else {
                View.showMessage("All clusters cleared out!");
            }
            resolve(false);
            return;
        }
        yield Utils.sleep(1000);
        View.showMessage(`Clusters found: ${clusters.length}`);
        yield View.flashClusters(clusters);
        fieldManager.removeClusters(clusters, field);
        View.showField(field);
        yield Utils.sleep(700);
        View.showMessage("Refilling blank clusters...");
        fieldManager.dropPointsOnBlankClusters(field);
        View.showField(field);
        yield Utils.sleep(700);
        fieldManager.fillBlankWithRandomNumbers(field);
        View.showField(field);
        resolve(true);
    }));
}
