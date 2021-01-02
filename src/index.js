/**
 * Collection.
 */
class Collection {
	constructor(callback = null) {
		this.collection = [];
		this.pk = 'id';
		this.qnty = 0;
		if (callback) {
			this.throwOrSetCallback(callback);
		}
	}

	get primaryKey() {
		return this.pk;
	}

	set primaryKey(pk) {
		this.throwAlreadyPopulated();
		this.throwNotPrimaryKey(pk);
		this.pk = pk;
	}

	get length() {
		return this.collection.length;
	}

	get items() {
		return this.collection;
	}

	set items(arr) {
		this.throwNotArray(arr);
		for (let obj of arr) {
			this.throwNotObject(obj);
		}
		this.collection = arr;
	}

	set quantify(number) {
		this.throwNotNonNegNumber(number);
		this.qnty = number;
		this.adjustItemsQuantity();
	}

	get quantify() {
		return this.qnty;
	}

	throwOrSetCallback(callback) {
		if (! callback instanceof Function) {
			throw new Error('Collection constructor only accpets a function as optional argument.');
		}
		if (callback.length != 1) {
			throw new Error('Collection constructor argument, if given, must be an one parameter function.');
		}
		this.callback = callback;
	}

	throwNotArray(arr) {
		if (! Array.isArray(arr)) {
			throw new Error('`Collection.items` only can be an array');
		}
	}

	throwAlreadyPopulated() {
		if (this.length > 0) {
			throw new Error('`Collection.primaryKey` cannot be set after populated `Collection.items`.');
		}
	}

	throwNotPrimaryKey(pk) {
		if (typeof pk !== 'string') {
			throw new Error('only strings can be passed to `collection.primaryKey`.');
		}
	}

	throwNotNonNegNumber(number) {
		if (
			typeof number !== 'number'
			|| isNaN(number)
			|| number < 0
		) {
			throw new Error('Collection.quantify must be a non-negative integer.');
		}
	}

	throwNotObject(obj) {
		if (
			Array.isArray(obj)
			|| typeof obj !== 'object'
			|| obj === null
		) {
			throw new Error('`Collection.items` must contains objects only');
		}
		if (! this.isValidObject(obj)) {
			throw new Error('Objects in `Collection.items` must own the `Collection.primaryKey` property.');
		}
	}

	isValidObject(obj) {
		return obj.hasOwnProperty(this.pk);
	}

	adjustObjectQuantity(obj) {
		obj.quantity = this.quantify;
		return obj;
	}

	adjustItemsQuantity() {
		let arr = [];
		for (let obj of this.items) {
			arr.push(this.adjustObjectQuantity(obj));
		}
		this.items = arr;
	}

	push(item) {
		this.throwNotObject(item);
		const alreadyIn = this.collection.some(_i => _i[this.pk] === item[this.pk]);
		if (alreadyIn) return false;

		if (this.quantify > 0) {
			item = this.adjustObjectQuantity(item);
		}
		this.collection = [...this.collection, item];
		return true;
	}

	increase(idInCollection, increment = 1) {
		if (this.quantify === 0) {
			throw new Error('Collection.quantify must be positive integer to unlock Collection::increase method usage.');
		}
		let item = this.collection.find(
			_o => _o[this.primaryKey] === idInCollection
		);
		if (! this.isValidObject(item)) {
			throw new Error('There is no match object with requested value of `Collection.primaryKey`.');
		}
		item.quantity += increment;
	}

	setAmmount(idInCollection, ammount) {
		if (this.quantify === 0) {
			throw new Error('Collection.quantify must be positive integer to unlock Collection::setAmmount method usage.');
		}
		let item = this.collection.find(
			_o => _o[this.primaryKey] === idInCollection
		);
		if (! this.isValidObject(item)) {
			throw new Error('There is no match object with requested value of `Collection.primaryKey`.');
		}
		item.quantity = ammount;
	}
}
export default Collection;
