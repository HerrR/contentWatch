export class solutionData {
    constructor(        
        public data: Array<Solution>
    ) {
        this.data = data;
    }
    public resetData() {
        this.data = new Array<Solution>();
    }
}

export class Solution {
    public contentText: string = "";
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