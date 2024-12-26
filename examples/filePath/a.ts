class A {
	constructor() {
		console.log("A");
	}

	method() {
		console.log("method");
	}

	async asyncMethod() {
		console.log("asyncMethod");
	}
}

const a = new A();
a.method();
a.asyncMethod();

const hello = () => {
	console.log("hello");
};

hello();
