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
            return -1;
        }
        if (y > this.height - 1) {
            return -1;
        }

        // calculate the position in the 2d array
        let pos = x + (this.width * y);

        return pos;
    }

    setValue(x, y, value) {
        let pos = this.calculatePosition(x, y);

        if (pos === -1) {
            throw "Input out of bounds";
        }

        this.arr[pos] = value;
    }

    getValue(x, y) {
        let pos = this.calculatePosition(x, y);

        if (pos === -1) {
            return -1;
        }

        return this.arr[pos];
    }

    
}

export { Grid };