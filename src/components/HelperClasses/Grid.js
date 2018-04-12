class Grid {

    constructor(width, height, fill) {

        if (!width) {
            width = 4;
        }
        if (!height) {
            height = 4;
        }
        if (!fill) {
            fill = "O";
        }

        this.width = width;
        this.height = height;

        let arrLen = this.height * this.width;

        this.arr = Array(arrLen).fill(fill);
    }

    calculatePosition(x, y) {
        // cast x and y as numbers
        x = parseInt(x);
        y = parseInt(y);

        //check if value is within bounds
        if (x > this.width - 1) {
            throw "The x value exceeds the width of the grid";
        }
        if (y > this.height - 1) {
            throw "This y value exceeds the height of the grid";
        }

        // calculate the position in the 2d array
        let pos = x + (this.width * y);

        alert("POS: " + pos);

        return pos;
    }

    setValue(x, y, value) {
        let pos = this.calculatePosition(x, y);

        this.arr[pos] = value;
    }

    getValue(x, y) {
        let pos = this.calculatePosition(x, y);

        return this.arr[pos];
    }

    
}

export { Grid };