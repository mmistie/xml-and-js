const timeout = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
function inc(a) {
	return timeout().then(() => a + 1);
}
const sum = (a, b) => {
	return timeout().then(() => a + b);
};
const max = (a, b) => {
    return timeout().then(() => (a > b ? a : b));
}
const avg = (a, b) => {
     return sum(a, b).then((sum) => sum / 2);
    }
const obj = {
	name: 'Marcus Aurelius',
	split(sep = ' ') {
		return timeout().then(() => this.name.split(sep));
	},
};    

class Person {
	constructor(name) {
		this.name = name;
	}
	static of(name) {
		return timeout().then(() => new Person(name));
	}
	split(sep = ' ') {
		return timeout().then(() => this.name.split(sep));
	}
}

inc(5)
	.then((value) => console.log('1) inc(5) =', value))
	.then(() => sum(1, 3))
	.then((value) => console.log('2) sum(1,3) =', value))
	.then(() => max(8, 6))
	.then((value) => console.log('3) max(8,6) =', value))
	.then(() => avg(8, 6))
	.then((value) => console.log('4) avg(8,6) =', value))
	.then(() => obj.split())
	.then((value) => console.log('5) obj.split() =', value))
	.then(() => Person.of('Marcus Aurelius'))
	.then((value) => value.split())
	.then((value) => console.log('6) person.split() =', value));