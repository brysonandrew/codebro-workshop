export const easeMotion = (isActive, peak, rate) => {
    if (isActive) {
        if (this.rate < peak) {
            this.rate += rate;
        } else {
            this.rate = 0.5;
        }
    } else if (!isActive) {
        if (this.rate > 0) {
            this.rate -= rate;
        } else {
            this.rate = 0;
        }
    }
    return this.rate
};
