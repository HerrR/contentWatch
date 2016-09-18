export class solutionData {
    constructor(        
        public data: Array<solution>
    ) {
        this.data = data;
    }

    public resetData() {
        this.data = Array<solution>();
    }
}
class solution {
    constructor(
        public title: string,
        public uri: string
    ){
        this.title = title;
        this.uri = uri;
    }
}

export class solutionDataWithProblemID {
    constructor(
        public data: solutionData[],     
        public problemID: string

    ) {
        this.data = data;
        this.problemID = problemID;
    }

    public resetData(){
        this.data = new Array<solutionData>();
    }
}