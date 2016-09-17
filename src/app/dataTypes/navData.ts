export class navEntries {
    constructor(        
        public entry: navMainCategory,
        public meta: navMetaData
    ) {
        this.entry = entry;
        this.meta = meta;
    }
}

export class navMetaData {
    constructor(
        public serviceprovider: string,
        public os: string,
        public revisionflag: string,
        public model: string,
        public _cat: string,
        public type: string,
        public lang: string,
        public category: string,
        public transactionId: string,
    ) {
        this.serviceprovider = serviceprovider;
        this.os = os;
        this.revisionflag = revisionflag;
        this.model = model;
        this._cat = _cat;
        this.type = type;
        this.lang = lang;
        this.category = category;
        this.transactionId = transactionId;
    }
}

export class navMainCategory {
    constructor(
        public category: string,
        public categoryDesc: string,
        public problems: Array<navSubCategory>
    ){
        this.category = category;
        this.categoryDesc = categoryDesc;
        this.problems = problems;
    }
}

export class navSubCategory {
    constructor(
        public id: string,
        public problemDesc: string,
        public uuid: string
    ){
        this.id = id;
        this.problemDesc = problemDesc;
        this.uuid = uuid;
    }
}