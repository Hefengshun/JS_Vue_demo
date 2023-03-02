class UpData {
    constructor(params) {
        this.num = params;
    }
    setData(num) {
        this.num = num
    }
    getData() {
        return this.num
    }
    static pubilc() {
        console.log("这里是一个静态的方法");
    }
}

// let upData = new UpData()

module.exports = UpData