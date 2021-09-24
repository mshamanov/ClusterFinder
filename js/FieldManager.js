import Cluster from "./Cluster.js";
import Point from "./Point.js";
import Utils from "./Utils.js";
class FieldManager {
    constructor(clusterSize = 4) {
        this.clusterSize = clusterSize;
        this.checkPoints = {};
    }
    findClusters(field) {
        const clusters = [];
        this.iterateField(field, (x, y) => {
            const collected = this.findConnections(new Point(x, y), field);
            if (collected.length >= this.clusterSize) {
                clusters.push(new Cluster(collected));
            }
        });
        this.checkPoints = {};
        return clusters;
    }
    findConnections(point, field) {
        var _a;
        if (!this.checkPoints[point.x]) {
            this.checkPoints[point.x] = {};
        }
        if ((_a = this.checkPoints[point.x][point.y]) === null || _a === void 0 ? void 0 : _a.checked) {
            return [];
        }
        else {
            this.checkPoints[point.x][point.y] = { checked: true };
        }
        const connections = [point];
        const topPoint = new Point(point.x - 1, point.y);
        const rightPoint = new Point(point.x, point.y + 1);
        const leftPoint = new Point(point.x, point.y - 1);
        const bottomPoint = new Point(point.x + 1, point.y);
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
        function isPointOfTheSameValue(parent, child) {
            const parentValue = field.getValue(parent.x, parent.y);
            const childValue = field.getValue(child.x, child.y);
            return parentValue === childValue;
        }
        return connections;
    }
    removeClusters(clusters, field) {
        clusters.forEach(cluster => {
            cluster.points.forEach(point => {
                field.setValue(point.x, point.y, -1);
            });
        });
    }
    dropPointsOnBlankClusters(clusters, field) {
        let startingBlankPoint = null;
        for (let y = field.size - 1; y >= 0; y--) {
            startingBlankPoint = null;
            for (let x = field.size - 1; x >= 0; x--) {
                let pointValue = field.getValue(x, y);
                if (!startingBlankPoint) {
                    if (pointValue === -1) {
                        startingBlankPoint = new Point(x, y);
                    }
                }
                else {
                    if (pointValue !== -1) {
                        field.setValue(startingBlankPoint.x, startingBlankPoint.y, pointValue);
                        field.setValue(x, y, -1);
                        startingBlankPoint = new Point(startingBlankPoint.x - 1, startingBlankPoint.y);
                    }
                }
            }
        }
    }
    fillBlankPointsWithRandomNumbers(field) {
        this.iterateField(field, (x, y) => {
            if (field.getValue(x, y) === -1) {
                field.setValue(x, y, Utils.getRandomNum(field.maxPointValue));
            }
        });
    }
    fillWithNumber(field, num) {
        this.iterateField(field, (x, y) => {
            field.setValue(x, y, num);
        });
    }
    iterateField(field, callback) {
        for (let x = 0; x < field.size; x++) {
            for (let y = 0; y < field.size; y++) {
                callback(x, y);
            }
        }
    }
}
export default FieldManager;
