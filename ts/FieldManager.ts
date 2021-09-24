import Field from "./Field.js";
import Cluster from "./Cluster.js";
import Point from "./Point.js";
import Utils from "./Utils.js";

class FieldManager {
    private checkPoints: any = {};

    constructor(private clusterSize: number = 4) {
    }

    public findClusters(field: Field): Array<Cluster> {
        const clusters: Cluster[] = [];

        this.iterateField(field, (x, y) => {
            const collected = this.findConnections(new Point(x, y), field);
            if (collected.length >= this.clusterSize) {
                clusters.push(new Cluster(collected));
            }
        });

        this.checkPoints = {};
        return clusters;
    }

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

    public removeClusters(clusters: Cluster[], field: Field): void {
        clusters.forEach(cluster => {
            cluster.points.forEach(point => {
                field.setValue(point.x, point.y, -1);
            });
        })
    }

    public dropPointsOnBlankClusters(clusters: Cluster[], field: Field) {
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

    public fillBlankPointsWithRandomNumbers(field: Field): void {
        this.iterateField(field, (x, y) => {
            if (field.getValue(x, y) === -1) {
                field.setValue(x, y, Utils.getRandomNum(field.maxPointValue));
            }
        });
    }

    public fillWithNumber(field: Field, num: number): void {
        this.iterateField(field, (x, y) => {
            field.setValue(x, y, num);
        });
    }

    private iterateField(field: Field, callback: (x: number, y: number) => void): void {
        for (let x = 0; x < field.size; x++) {
            for (let y = 0; y < field.size; y++) {
                callback(x, y);
            }
        }
    }
}

export default FieldManager;