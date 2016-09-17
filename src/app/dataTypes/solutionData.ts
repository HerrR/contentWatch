export class solutionData {
    constructor(        
        public data: Array<solution>
    ) {
        this.data = data;
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