var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class View {
    static showButton(value = "", callback) {
        const buttonCallback = (event) => {
            callback(event);
            this.hideButton();
        };
        const buttonElement = View.getButton();
        buttonElement.classList.remove("hidden");
        buttonElement.innerHTML = value;
        buttonElement.onclick = buttonCallback;
    }
    static hideButton() {
        const buttonElement = View.getButton();
        if (!buttonElement.classList.contains("hidden")) {
            buttonElement.classList.add("hidden");
        }
    }
    static getButton() {
        const buttonElement = document.querySelector(".control button");
        if (!buttonElement) {
            throw new Error(`Button element not found!`);
        }
        return buttonElement;
    }
    static draw(field) {
        const rootElement = document.querySelector(this.root);
        if (!rootElement) {
            throw new Error(`Root element ${(View.root)} not found!`);
        }
        rootElement.innerHTML = "";
        for (let x = 0; x < field.size; x++) {
            const rowDiv = this.createDiv(`row-x-${x}`, "row");
            for (let y = 0; y < field.size; y++) {
                const colValue = field.getValue(x, y);
                const colDiv = this.createDiv(`col-x-${x}-y-${y}`, "point", colValue === -1 ? "" : String(colValue));
                rowDiv.appendChild(colDiv);
            }
            rootElement.appendChild(rowDiv);
        }
    }
    static print(value) {
        const outputElement = document.querySelector(".output");
        if (!outputElement) {
            throw new Error(`Output element not found!`);
        }
        outputElement.innerHTML = value;
    }
    static drawClusters(clusters) {
        clusters.forEach(cluster => {
            cluster.points.forEach(point => View.highlight(point));
        });
    }
    static blinkClusters(clusters) {
        return __awaiter(this, void 0, void 0, function* () {
            function blink(ms) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        clusters.forEach(cluster => {
                            cluster.points.forEach(point => View.highlight(point));
                        });
                        resolve(null);
                    }, ms);
                });
            }
            const promises = [];
            for (let i = 8; i > 0; i--) {
                promises.push(blink(i * 300));
            }
            yield Promise.all(promises);
        });
    }
    static highlight(point) {
        const pointElement = document.getElementById(`col-x-${point.x}-y-${point.y}`);
        if (!pointElement) {
            throw new Error(`Point element x: ${point.x}, y: ${point.y} not found!`);
        }
        pointElement.classList.toggle("highlighted-point");
    }
    static createDiv(id, className, value) {
        const div = document.createElement("div");
        div.setAttribute("id", id);
        if (className) {
            div.setAttribute("class", className);
        }
        if (value) {
            const p = document.createElement("p");
            p.innerHTML = value;
            div.appendChild(p);
        }
        return div;
    }
}
View.root = ".main";
export default View;
