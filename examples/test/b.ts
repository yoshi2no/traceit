class B {
	constructor() {
        console.log("⭐️[DEBUG:traceit] B.constructor");}

	method() {
        console.log("⭐️[DEBUG:traceit] method");}

	async asyncMethod() {
        console.log("⭐️[DEBUG:traceit] asyncMethod");}
}

const b = new B();
b.method();
b.asyncMethod();

const helloB = () => {
    console.log("⭐️[DEBUG:traceit] helloB");};

function helloB2() {
    console.log("⭐️[DEBUG:traceit] helloB2");}

export function helloB3() {
    console.log("⭐️[DEBUG:traceit] helloB3");}

export const helloB4 = () => {
    console.log("⭐️[DEBUG:traceit] helloB4");};

helloB();
helloB2();
helloB3();
helloB4();
