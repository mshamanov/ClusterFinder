/**
 * Class to represent a field
 */
class Field {
    private readonly points: number[] = [];

    /**
     * After being constructed the field's cells have negative value of -1 to indicate they are blank
     *
     * @param size size of the field
     */
    constructor(public size: number) {
        this.fillWithNegativeNumbers();
    }

    /**
     * Fills the field's cells with negative numbers to indicate that they are blank,
     * i.e. cells with -1 as a value must be considered as blank cells
     */
    private fillWithNegativeNumbers() {
        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            this.points.push(-1);
        }
    }

    /**
     * Retrieves the value from the given coordinates
     *
     * @param x coordinate
     * @param y coordinate
     */
    public getValue(x: number, y: number): number {
        const idx: number = this.getIndex(x, y);

        return this.points[idx];
    }

    /**
     * Assign a value to a cell of given coordinates
     *
     * @param x coordinate
     * @param y coordinate
     * @param value value to be assigned
     */
    public setValue(x: number, y: number, value: number): void {
        const idx: number = this.getIndex(x, y);

        this.points[idx] = value;
    }

    /**
     * Replaces the values of this field's cells with the given ones
     *
     * @param points values to set to this field's cells
     */
    public setPoints(points: number[]): void {
        this.points.length = 0;
        this.points.push(...points);
    }

    /**
     * Finds the index of the inner array by the given coordinates
     *
     * @param x coordinate
     * @param y coordinate
     */
    private getIndex(x: number, y: number) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return -1;
        }

        return x * this.size + y;
    }

    /**
     * Returns field representation and its cells as a string
     */
    public toString(): string {
        let model: Array<number[]> = [[]];
        let x = 0;
        this.points.forEach((val, idx) => {
            if (idx !== 0 && idx % this.size === 0) {
                model[++x] = [val];
            } else {
                model[x].push(val);
            }
        });

        return model.map(arr => arr.join(" | ")).join("\n");
    }
}

export default Field;