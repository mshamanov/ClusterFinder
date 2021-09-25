import Field from "./Field.js";
import FieldManager from "./FieldManager.js";
import Cluster from "./Cluster.js";
import View from "./View.js";
import Utils from "./Utils.js";

const field: Field = new Field(5);
const fieldManager: FieldManager = new FieldManager(4);

View.showField(field);

View.showButton("Start", async () => {
    await start();
});

/**
 * Starts the application
 */
async function start(): Promise<any> {
    let firstRun: boolean = true;

    while (true) {
        const repeat = await action(firstRun);
        if (firstRun) {
            firstRun = false;
        }
        if (!repeat) {
            break;
        }
    }

    View.showButton("Restart", async () => {
        fieldManager.fillAllWithNumber(field, -1);
        await start();
    });
}

/**
 * Process the field to find all the clusters
 *
 * @param firstRun is the function being called for the first time
 */
function action(firstRun: boolean): Promise<boolean> {
    return new Promise(async (resolve) => {
            if (firstRun) {
                fieldManager.fillBlankWithRandomNumbers(field);
                View.showField(field);
            }

            View.showMessage("Discovering clusters...");
            const clusters: Cluster[] = fieldManager.findClusters(field);

            if (clusters.length === 0) {
                if (firstRun) {
                    View.showMessage("No clusters found!");
                } else {
                    View.showMessage("All clusters cleared out!");
                }
                resolve(false);
                return;
            }

            await Utils.sleep(1000);

            View.showMessage(`Clusters found: ${clusters.length}`);
            await View.flashClusters(clusters);

            fieldManager.removeClusters(clusters, field);
            View.showField(field);

            await Utils.sleep(700);

            View.showMessage("Refilling blank clusters...");
            fieldManager.dropPointsOnBlankClusters(field);
            View.showField(field);

            await Utils.sleep(700);

            fieldManager.fillBlankWithRandomNumbers(field);
            View.showField(field);

            resolve(true);
        }
    );
}