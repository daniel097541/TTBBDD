module.exports = {
    GOOD: 'good',
    BAD: 'bad',
    NEUTRAL: 'neutral',
    getByName: (name) => {
        switch (name) {
            case 'good':
                return this.GOOD;
            case 'bad':
                return this.BAD;
            case 'neutral':
                return this.NEUTRAL;
        }
    }
}
