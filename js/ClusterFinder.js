import Cluster from "./Cluster.js";
import Point from "./Point.js";
class ClusterFinder {
    constructor() {
        this.CLUSTER_MIN_SIZE = 4;
        this.clusters = [];
        this.checkPoints = {};
    }
    findClusters(field) {
        for (let x = 0; x < field.size; x++) {
            for (let y = 0; y < field.size; y++) {
                const collected = this.findConnections(new Point(x, y), field);
                if (collected.length >= this.CLUSTER_MIN_SIZE) {
                    this.clusters.push(new Cluster(collected));
                }
            }
        }
        return this.clusters;
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
}
export default ClusterFinder;
