class Field {
    constructor(size, maxPointValue = 3) {
        this.size = size;
        this.maxPointValue = maxPointValue;
        this.points = [];
        this.generatePoints();
    }
    generatePoints() {
        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            this.points.push(-1);
        }
    }
    getValue(x, y) {
        const idx = this.getIndex(x, y);
        return this.points[idx];
    }
    setValue(x, y, value) {
        const idx = this.getIndex(x, y);
        this.points[idx] = value;
    }
    getIndex(x, y) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return -1;
        }
        return x * this.size + y;
    }
    toString() {
        let model = [[]];
        let x = 0;
        this.points.forEach((val, idx) => {
            if (idx !== 0 && idx % this.size === 0) {
                model[++x] = [val];
            }
            else {
                model[x].push(val);
            }
        });
        return model.map(arr => arr.join(" | ")).join("\n");
    }
}
export default Field;
