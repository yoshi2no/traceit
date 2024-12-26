class A {
	constructor() {
		console.log("⭐️[DEBUG:traceit] a.ts - A.constructor");
	}

	method() {
		console.log("⭐️[DEBUG:traceit] a.ts - method");
	}

	async asyncMethod() {
		console.log("⭐️[DEBUG:traceit] a.ts - asyncMethod");
	}
}

const a = new A();
a.method();
a.asyncMethod();

const helloA = () => {
	console.log("⭐️[DEBUG:traceit] a.ts - helloA");
};

function helloA2() {
	console.log("⭐️[DEBUG:traceit] a.ts - helloA2");
}

export function helloA3() {
	console.log("⭐️[DEBUG:traceit] a.ts - helloA3");
}

export const helloA4 = () => {
	console.log("⭐️[DEBUG:traceit] a.ts - helloA4");
};

helloA();
helloA2();
helloA3();
helloA4();
