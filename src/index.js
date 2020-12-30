/**
 * Collection.
 */
class Collection {
	constructor() {
		this.collection = [];
		this.pk = 'id';
		this.qnty = 0;
	}

	get primaryKey() {
		return this.pk;
	}

	set primaryKey(pk) {
		if (typeof pk !== 'string') {
			throw new Error('only strings can be passed to `collection.primaryKey`.');
		}
		this.pk = pk;
	}

	get length() {
		return this.collection.length;
	}

	get items() {
		return this.collection;
	}

	set items(arr) {
		if (Array.isArray(arr)) {
			for (let obj in arr) {
				this.throwNonObject(obj);
			}
			this.collection = arr;
		} else {
			throw new Error('`Collection.items` only can be an array');
		}
	}

	set quantify(number) {
		if (isNaN(number) || number < 0) {
			throw new Error('Collection.quantify must be a non-negative integer.');
		}
		this.qnty = number;
	}

	get quantify() {
		return this.qnty;
	}

	isValidObject(obj) {
		return obj.hasOwnProperty(this.pk);
	}

	throwNonObject(obj) {
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

	adjustQuantity(obj) {
		obj.quantity = this.quantify;
		return obj;
	}

	push(item) {
		this.throwNonObject(item);
		const alreadyIn = this.collection.some(_i => _i[this.pk] === item[this.pk]);
		if (alreadyIn) return false;

		if (this.quantify > 0) {
			item = this.adjustQuantity(item);
		}
		this.collection = [...this.collection, item];
		return true;
	}

}
export default Collection;
