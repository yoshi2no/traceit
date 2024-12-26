class A {
	constructor() {
		console.log("⭐️[DEBUG:traceit] A.constructor");
	}

	method() {
		console.log("⭐️[DEBUG:traceit] method");
	}

	async asyncMethod() {
		console.log("⭐️[DEBUG:traceit] asyncMethod");
	}
}

const a = new A();
a.method();
a.asyncMethod();

const helloA = () => {
	console.log("⭐️[DEBUG:traceit] helloA");
};

function helloA2() {
	console.log("⭐️[DEBUG:traceit] helloA2");
}

export function helloA3() {
	console.log("⭐️[DEBUG:traceit] helloA3");
}

export const helloA4 = () => {
	console.log("⭐️[DEBUG:traceit] helloA4");
};

helloA();
helloA2();
helloA3();
helloA4();
