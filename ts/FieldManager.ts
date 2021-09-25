import Field from "./Field.js";
import Cluster from "./Cluster.js";
import Point from "./Point.js";
import Utils from "./Utils.js";

/**
 * Class to manipulate a field {@link Field}
 */
class FieldManager {
    private checkPoints: any = {};

    /**
     * @param minClusterSize minimum value (inclusive) of a cluster (adjacent numbers of the same value) to be collected
     * @param maxPointValue maximum value used by a random number generator to inject values to a field's cells
     */
    constructor(private minClusterSize: number = 4, private maxPointValue: number = 3) {
    }

    /**
     * Finds clusters {@link Cluster} on a given field and returns them as an array
     *
     * @param field given field
     */
    public findClusters(field: Field): Array<Cluster> {
        const clusters: Cluster[] = [];

        this.iterateField(field, (x, y) => {
            const collected = this.findConnections(new Point(x, y), field);
            if (collected.length >= this.minClusterSize) {
                clusters.push(new Cluster(collected));
            }
        });

        this.checkPoints = {};
        return clusters;
    }

    /**
     * Finds adjacent numbers of the same value representing a cluster {@link Cluster}
     * and returns their coordinates as an array of points {@link Point}
     *
     * @param point point to begin search from
     * @param field given field
     */
    private findConnections(point: Point, field: Field): Point[] {
        if (!this.checkPoints[point.x]) {
            this.checkPoints[point.x] = {};
        }

        if (this.checkPoints[point.x][point.y]?.checked) {
            return [];
        } else {
            this.checkPoints[point.x][point.y] = {checked: true};
        }

        const connections: Point[] = [point];

        const topPoint: Point = new Point(point.x - 1, point.y);
        const rightPoint: Point = new Point(point.x, point.y + 1);
        const leftPoint: Point = new Point(point.x, point.y - 1);
        const bottomPoint: Point = new Point(point.x + 1, point.y);

        if (isPointOfTheSameValue(point, topPoint)) {
            connections.push(...this.findConnections(topPoint, field));
        }

        if (isPointOfTheSameValue(point, rightPoint)) {
            connections.push(...this.findConnections(rightPoint, field));
        }

        if (isPointOfTheSameValue(point, leftPoint)) {
            connections.push(...this.findConnections(leftPoint, field));
        }

        if (isPointOfTheSameValue(point, bottomPoint)) {
            connections.push(...this.findConnections(bottomPoint, field));
        }

        function isPointOfTheSameValue(parent: Point, child: Point): boolean {
            const parentValue = field.getValue(parent.x, parent.y);
            const childValue = field.getValue(child.x, child.y);
            return parentValue === childValue;
        }

        return connections;
    }

    /**
     * Removes clusters {@link Cluster} from a given field
     *
     * @param clusters given clusters
     * @param field given field
     */
    public removeClusters(clusters: Cluster[], field: Field): void {
        clusters.forEach(cluster => {
            cluster.points.forEach(point => {
                field.setValue(point.x, point.y, -1);
            });
        })
    }

    /**
     * Places field values on top of the blank spaces left after the clusters having been removed
     *
     * @param field given field
     */
    public dropPointsOnBlankClusters(field: Field) {
        let startingBlankPoint: Point | null = null;

        for (let y = field.size - 1; y >= 0; y--) {
            startingBlankPoint = null;
            for (let x = field.size - 1; x >= 0; x--) {
                let pointValue = field.getValue(x, y);
                if (!startingBlankPoint) {
                    if (pointValue === -1) {
                        startingBlankPoint = new Point(x, y);
                    }
                } else {
                    if (pointValue !== -1) {
                        field.setValue(startingBlankPoint.x, startingBlankPoint.y, pointValue);
                        field.setValue(x, y, -1);
                        startingBlankPoint = new Point(startingBlankPoint.x - 1, startingBlankPoint.y);
                    }
                }
            }
        }
    }

    /**
     * Fills blank points of a given field with randomly generated numbers
     *
     * @param field given field
     */
    public fillBlankWithRandomNumbers(field: Field): void {
        this.iterateField(field, (x, y) => {
            if (field.getValue(x, y) === -1) {
                field.setValue(x, y, Utils.getRandomNum(this.maxPointValue));
            }
        });
    }

    /**
     * Fills all the points of a given field with the given value
     *
     * @param field given field
     * @param numValue given value to fill the points of a field
     */
    public fillAllWithNumber(field: Field, numValue: number): void {
        this.iterateField(field, (x, y) => {
            field.setValue(x, y, numValue);
        });
    }

    /**
     * Iterates a given field and calls a callback function against its every point
     *
     * @param field given field
     * @param callback function to call while field being iterated
     */
    private iterateField(field: Field, callback: (x: number, y: number) => void): void {
        for (let x = 0; x < field.size; x++) {
            for (let y = 0; y < field.size; y++) {
                callback(x, y);
            }
        }
    }
}

export default FieldManager;