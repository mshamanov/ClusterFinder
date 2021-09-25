var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Class to manipulate DOM
 */
class View {
    /**
     * Displays the button on the html page
     *
     * @param value button's value
     * @param callback function to call upon clicking the button
     */
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
    /**
     * Hides the button
     */
    static hideButton() {
        const buttonElement = View.getButton();
        if (!buttonElement.classList.contains("hidden")) {
            buttonElement.classList.add("hidden");
        }
    }
    /**
     * Returns the html element representing the button
     */
    static getButton() {
        const buttonElement = document.querySelector(".control button");
        if (!buttonElement) {
            throw new Error(`Button element not found!`);
        }
        return buttonElement;
    }
    /**
     * Displays a given field on the html page
     *
     * @param field given field
     */
    static showField(field) {
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
    /**
     * Displays a message on the html page informing about the progress of the application
     *
     * @param message message to display
     */
    static showMessage(message) {
        const outputElement = document.querySelector(".output");
        if (!outputElement) {
            throw new Error(`Output element not found!`);
        }
        outputElement.innerHTML = message;
    }
    /**
     * Highlights clusters on a field with a flashing animation
     *
     * @param clusters clusters to have a flashing animation
     */
    static flashClusters(clusters) {
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
    /**
     * Highlights a point on a field
     *
     * @param point point to be highlighted
     */
    static highlight(point) {
        const pointElement = document.getElementById(`col-x-${point.x}-y-${point.y}`);
        if (!pointElement) {
            throw new Error(`Point element x: ${point.x}, y: ${point.y} not found!`);
        }
        pointElement.classList.toggle("highlighted-point");
    }
    /**
     * Creates a div element
     *
     * @param id div id
     * @param className div classes
     * @param value value inside a div
     */
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
