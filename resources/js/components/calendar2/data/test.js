export default function test() {
    this.a = 'a';
    this.b = 'b';
}
test.prototype.constructor = function (c) {
    this.c = c;
    this.meth();
}

test.prototype.meth = function () {
    this.d = 'd';
}