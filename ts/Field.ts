class Field {
    private readonly points: number[] = [];

    constructor(public size: number, public maxPointValue: number = 3) {
        this.generatePoints();
    }

    private generatePoints() {
        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            this.points.push(-1);
        }
    }

    public getValue(x: number, y: number): number {
        const idx: number = this.getIndex(x, y);

        return this.points[idx];
    }

    public setValue(x: number, y: number, value: number): void {
        const idx: number = this.getIndex(x, y);

        this.points[idx] = value;
    }

    private getIndex(x: number, y: number) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return -1;
        }

        return x * this.size + y;
    }

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