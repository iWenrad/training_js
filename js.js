// REST оператор ...
// Потрібний тоді коли ф-я приймає певну к-ть значент, але ми не знаємо скільки
// Створює масив

const log = function(a, b, ...rest) {
	console.log(a, b, rest);
}

log(1, 2, 4, 5, 6, 7, "REST", "das", 3, 2);


function double(numOne, numTwo = 0) {
	console.log(numOne * numTwo);
}

double(2, 1);

