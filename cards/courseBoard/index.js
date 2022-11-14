class courseBoard {
    constructor(place) {
        this.name = 'courseBoard';
        this.place = place;
        this.config = null;
        this.DayTime = this.DayTime.bind(this);
        this.DomInit = this.DomInit.bind(this);
        console.log('courseBoard loaded', this.place);
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
            this.template = await loadTemplate(this.name, this.config);
            $(this.place).html(this.template);
        }
    }
    DomInit() {
        const week = Math.ceil((new Date() - new Date(this.config.startDate)) / (7 * 24 * 60 * 60 * 1000));
        const weekDay = new Date().getDay();
        const dayTime = this.DayTime();
        const status = null;
        dayTime < 2 ? status = 1 : status = 0;
        weekDay === 7 ? status = 0 : null;
        const course = status ? this.config.course[week][weekDay][dayTime] : null;
    }
    DayTime() {
        const nowHour = new Date().getHours();
        const nowMinute = new Date().getMinutes();
        if (nowHour <= this.config.noonRestTimeStart.split(':')[0]
            && nowMinute <= this.config.noonRestTimeStart.split(':')[1]) {
            return 0;
        } else if (nowHour <= this.config.noonRestTimeEnd.split(':')[0]
            && nowMinute <= this.config.noonRestTimeEnd.split(':')[1]) {
            return 1;
        } else {
            return 2;
        }
    }
}