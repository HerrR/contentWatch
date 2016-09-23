export class QueryParams {
    constructor(
        public env: Object,
        public tenant: string,
        public lang: string,
        public category: string,
        public model: string,
        public os: string
    ) {
        this.env = env; //env.toLowerCase();
        this.tenant = tenant.toLowerCase();
        this.lang = lang.toLowerCase();
        this.category = category.toLowerCase();
        this.model = model.toLowerCase();
        this.os = os;
    }
}