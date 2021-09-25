import Point from "./Point.js";

/**
 * Class to hold the points representing one cluster
 */
class Cluster {
    /**
     * @param points array of coordinates
     */
    constructor(readonly points: Point[]) {
    }
}

export default Cluster;