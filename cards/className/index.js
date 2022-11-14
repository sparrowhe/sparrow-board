class className {
    constructor(place) {
        this.name = 'className';
        this.place = place;
        this.config = null;
        console.log('className loaded', this.place);
    }
    async Init() {
        this.config = await loadSetting(this.name);
        this.template = await loadTemplate(this.name, this.config);
        $(this.place).html(this.template);
    }
    async Refresh() {
        const newConfig = await loadSetting(this.name);
        if (JSON.stringify(newConfig) !== JSON.stringify(this.config)) {
            this.config = newConfig;
            this.template = await loadTemplate(this.name, this.config, false);
            $(this.place).html(this.template);
        }
    }
}