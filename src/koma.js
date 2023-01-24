class Koma {
    constructor(name) {
        this.name = name;
    }
    canMove(virtical, horizontal, isPromoted) {
        return false;
    }
}

export class Fu extends Koma {
    constructor() {
        super("歩");
    }
    canMove(virtical, horizontal, isPromoted) {
        if (isPromoted) return canMoveOfKin(virtical, horizontal);
        return virtiacl === 1 && horizontal === 0;
    }
}

export class Kyosha extends Koma {
    constructor() {
        super("香");
    }
    canMove(virtical, horizontal, isPromoted) {
        if (isPromoted) return canMoveOfKin(virtical, horizontal);
        return horizontal === 0;
    }
}

export class Keima extends Koma {
    constructor() {
        super("桂");
    }
    canMove(virtical, horizontal, isPromoted) {
        if (isPromoted) return canMoveOfKin(virtical, horizontal);
        return (virtical === 2 && (horizontal === 1 || horizontal === -1)) ||
            (virtical === 1 && (horizontal === 2 || horizontal === -2)) ||
            (virtical === -1 && (horizontal === 2 || horizontal === -2)) ||
            (virtical === -2 && (horizontal === 1 || horizontal === -1));
    }
}

export class Gin extends Koma {
    constructor() {
        super("銀");
    }
    canMove(virtical, horizontal, isPromoted) {
        if (isPromoted) return canMoveOfKin(virtical, horizontal);
        return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1)) ||
            (virtical === -1 && (horizontal === 1 || horizontal === -1));
    }
}

export class Kin extends Koma {
    constructor() {
        super("金");
    }
    canMove(virtical, horizontal, isPromoted) {
        if (isPromoted) return canMoveOfKin(virtical, horizontal);
        return canMoveOfKin(virtical, horizontal);
    }
}

export class Kaku extends Koma {
    constructor() {
        super("角");
    }
    canMove(virtical, horizontal, isPromoted) {
        return (Math.abs(virtical) === Math.abs(horizontal)) ||
            (isPromoted && canMoveOfGyoku(virtical, horizontal));
    }
}

export class Hisha extends Koma {
    constructor() {
        super("飛");
    }
    canMove(virtical, horizontal) {
        return (virtical === 0 || horizontal === 0) ||
        (isPromoted && canMoveOfGyoku(virtical, horizontal));
    }
}

export class Gyoku extends Koma {
    constructor() {
        super("玉");
    }
    canMove(virtical, horizontal) {
        return canMoveOfGyoku(virtical, horizontal);
    }
}

function canMoveOfKin(virtical, horizontal) {
    return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1)) ||
            (virtical === 0 && (horizontal === 1 || horizontal === -1))
            (virtical === -1 && horizontal === 0 );
}

function canMoveOfGyoku(virtical, horizontal) {
    return (virtical === 1 && (horizontal === 1 || horizontal === 0 || horizontal === -1))
        (virtical === 0 && (horizontal === 1 || horizontal === -1))
        (virtical === -1 && (horizontal === 1 || horizontal === 0 || horizontal === -1));
}