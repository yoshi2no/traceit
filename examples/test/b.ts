class B {
	constructor() {
        console.log("⭐️[DEBUG:traceit] b.ts - B.constructor");}

	method() {
        console.log("⭐️[DEBUG:traceit] b.ts - method");}

	async asyncMethod() {
        console.log("⭐️[DEBUG:traceit] b.ts - asyncMethod");}
}

const b = new B();
b.method();
b.asyncMethod();

const helloB = () => {
    console.log("⭐️[DEBUG:traceit] b.ts - helloB");};

function helloB2() {
    console.log("⭐️[DEBUG:traceit] b.ts - helloB2");}

export function helloB3() {
    console.log("⭐️[DEBUG:traceit] b.ts - helloB3");}

export const helloB4 = () => {
    console.log("⭐️[DEBUG:traceit] b.ts - helloB4");};

helloB();
helloB2();
helloB3();
helloB4();
