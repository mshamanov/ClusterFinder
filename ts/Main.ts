import Field from "./Field.js";
import FieldManager from "./FieldManager.js";
import Cluster from "./Cluster.js";
import View from "./View.js";

const field: Field = new Field(5);
const fieldManager: FieldManager = new FieldManager();
View.draw(field);
View.showButton("Start", () => start());

async function start(): Promise<any> {
    fieldManager.fillBlankPointsWithRandomNumbers(field);
    View.draw(field);

    while (true) {
        const result = await repeat();
        if (!result) {
            break;
        }
    }

    View.showButton("Restart", () => {
        fieldManager.fillWithNumber(field, -1);
        start();
    });
}

function repeat(): Promise<boolean> {
    return new Promise(resolve => {
        View.print("Discovering clusters...");
        const clusters: Cluster[] = fieldManager.findClusters(field);

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
                }
            );
        }, 1000);
    });
}