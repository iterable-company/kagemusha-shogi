class Koma {
    constructor(name, promotedName) {
        this.name = name;
        this.promotedName = promotedName;
        this.isPromoted = false;
    }
    canMove(virtical, horizontal) {
        return false;
    }
    promote() {
        this.isPromoted = true;
    }
    canPromote() {
        return !this.isPromoted;
    }
    displayName() {
        if (this.isPromoted) return this.promotedName;
        return this.name;
    }
    getInit() {
        return new Koma(this.name, this.promotedName);
    }
    clone() {
        var cloned = new Koma(this.name, this.promotedName);
        cloned.isPromoted = this.isPromoted;
        return cloned;
    }
}

export class Fu extends Koma {
    constructor() {
        super("歩", "と");
    }
    canMove(virtical, horizontal) {
        if (this.isPromoted) return canMoveOfKin(virtical, horizontal);
        return virtical === 1 && horizontal === 0;
    }
}

export class Kyosha extends Koma {
    constructor() {
        super("香", "成香");
    }
    canMove(virtical, horizontal) {
        if (this.isPromoted) return canMoveOfKin(virtical, horizontal);
        return horizontal === 0;
    }
}

export class Keima extends Koma {
    constructor() {
        super("桂", "成桂");
    }
    canMove(virtical, horizontal) {
        if (this.isPromoted) return canMoveOfKin(virtical, horizontal);
        return (virtical === 2 && (horizontal === 1 || horizontal === -1)) ||
            (virtical === 1 && (horizontal === 2 || horizontal === -2)) ||
            (virtical === -1 && (horizontal === 2 || horizontal === -2)) ||
            (virtical === -2 && (horizontal === 1 || horizontal === -1));
    }
}

export class Gin extends Koma {
    constructor() {
        super("銀", "全");
    }
    canMove(virtical, horizontal) {
        if (this.isPromoted) return canMoveOfKin(virtical, horizontal);
        return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1)) ||
            (virtical === -1 && (horizontal === 1 || horizontal === -1));
    }
}

export class Kin extends Koma {
    constructor() {
        super("金", "");
    }
    canMove(virtical, horizontal) {
        if (this.isPromoted) return canMoveOfKin(virtical, horizontal);
        return canMoveOfKin(virtical, horizontal);
    }
    canPromote() {
        return false;
    }
}

export class Kaku extends Koma {
    constructor() {
        super("角", "馬");
    }
    canMove(virtical, horizontal) {
        return (Math.abs(virtical) === Math.abs(horizontal)) ||
            (this.isPromoted && canMoveOfGyoku(virtical, horizontal));
    }
}

export class Hisha extends Koma {
    constructor() {
        super("飛", "龍");
    }
    canMove(virtical, horizontal) {
        return (virtical === 0 || horizontal === 0) ||
        (this.isPromoted && canMoveOfGyoku(virtical, horizontal));
    }
}

export class Gyoku extends Koma {
    constructor() {
        super("玉", "");
    }
    canMove(virtical, horizontal) {
        return canMoveOfGyoku(virtical, horizontal);
    }
    canPromote() {
        return false;
    }
}

function canMoveOfKin(virtical, horizontal) {
    return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1)) ||
            (virtical === 0 && (horizontal === 1 || horizontal === -1)) ||
            (virtical === -1 && horizontal === 0 );
}

function canMoveOfGyoku(virtical, horizontal) {
    return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1)) ||
        (virtical === 0 && (horizontal === 1 || horizontal === -1)) ||
        (virtical === -1 && (horizontal === 1 || horizontal === 0 || horizontal === -1));
}