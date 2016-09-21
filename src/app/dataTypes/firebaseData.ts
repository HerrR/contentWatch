export class QueryParams {
    constructor(
        public env: Object,
        public tenant: Object,
        public lang: Object,
        public category: Object,
        public model: Object,
        public os: Object
    ) {
        this.env = env.toLowerCase();
        this.tenant = tenant.toLowerCase();
        this.lang = lang.toLowerCase();
        this.category = category.toLowerCase();
        this.model = model.toLowerCase();
        this.os = os;
    }
}