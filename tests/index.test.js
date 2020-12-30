import Collection from '../src/index';

describe('Instance must throw.', function() {
	describe('Collection.quantify issues', function() {
		it('throws if not a number is given', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.quantify = '1';
			} catch(e) {
				expect(e.message).toBe('Collection.quantify must be a non-negative integer.');
			}
		});
		it('throws if negative number is given', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.quantify = -1;
			} catch(e) {
				expect(e.message).toBe('Collection.quantify must be a non-negative integer.');
			}
		});
		it('throws if `increase` method is called when Collection.quantify is not positive integer.', function() {
			const col = new Collection();
			col.push({id:1});
			expect.assertions(1);
			try {
				col.increase(1);
			} catch(e) {
				expect(e.message).toBe('Collection.quantify must be positive integer to unlock Collection::increase method usage.');
			}
		});
		it('throws if `setAmmount` method is called when Collection.quantify is not positive integer.', function() {
			const col = new Collection();
			col.push({id:1});
			expect.assertions(1);
			try {
				col.setAmmount(1,1);
			} catch(e) {
				expect(e.message).toBe('Collection.quantify must be positive integer to unlock Collection::setAmmount method usage.');
			}
		});
	});
	describe('Collection.primaryKey issues', function() {
		it('throws if `Collection.primaryKey` is not a string.', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.primaryKey = 0;
			} catch(e) {
				expect(e.message).toBe('only strings can be passed to `collection.primaryKey`.');
			}
		});
		it('throws if Collection.primaryKey is set after populated Collection.items', function() {
			const col = new Collection();
			col.items = [{id:1}];
			expect.assertions(1);
			try {
				col.primaryKey = 'customId';
			} catch(e) {
				expect(e.message).toBe('only strings can be passed to `Collection.primaryKey` cannot be set after populated `Collection.items`.');
			}
		});
		it('trhows if try to add invalid object to Collection.items.', function() {
			const col = new Collection();
			const invalidObj = {idx:1};
			expect.assertions(1);
			try {
				col.push(invalidObj);
			} catch(e) {
				expect(e.message).toBe('Objects in `Collection.items` must own the `Collection.primaryKey` property.');
			}
		});
		it('throws if at least one object in collection array does not have a valid `Collection.primaryKey` property', function() {
			const col = new Collection();
			expect.assertions(1);
			const arrWithInvalidObj = [{id:1}, {idx:2}];
			try {
				col.items = arrWithInvalidObj;
			} catch(e) {
				expect(e.message).toBe('Objects in `Collection.items` must own the `Collection.primaryKey` property.');
			}
		});
	});
	describe('Collection.items issues', function() {
		it('throws if try to add a non-object into Collection.items array', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.push('1');
			} catch(e) {
				expect(e.message).toBe('`Collection.items` must contains objects only');
			}
		});
		it('throws if there is a non-object entry in collection array', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.items = [1];
			} catch(e) {
				expect(e.message).toBe('`Collection.items` must contains objects only');
			}
		});
		it('throws if try pass other than array to Collection.items.', function() {
			const col = new Collection();
			expect.assertions(1);
			try {
				col.items = '1';
			} catch(e) {
				expect(e.message).toBe('`Collection.items` only can be an array');
			}
		});
	});
});
describe('Instance must not throw.', function() {
	describe('Collection initial values', function() {
		it('has empty array as items.', function() {
			const col = new Collection();
			expect(col.items).toBe([]);
		});
		it('has `id` as primaryKey.', function() {
			const col = new Collection();
			expect(col.primaryKey).toBe('id');
		});
		it('has 0 as quantify.', function() {
			const col = new Collection();
			expect(col.quantify).toBe(0);
		});
		it('when quantify is positive, increase method has default value 1 at the second parameter function.', function() {
			const col = new Collection();
			const obj = {id:1};
			const expectedObj = {id:1, quantity:2};
			col.quantify = 1;
			col.push(obj);
			expect(col.items).toBe([expectedObj]);
		});
	});
	describe('Collection configuration', function() {
		it('allows to set a custom primaryKey before items are populated.', function() {
			const customId = 'customId';
			const col = new Collection();
			col.primaryKey = customId;
			expect(col.primaryKey).toBe(customId);
		});
	});
	describe('Collection usage (getters and setters)', function() {
		it('shows Collection.items array length via Collection.length.', function() {
			const col = new Collection();
			expect(col.length).toBe(0);
		});
		it('accepts array as new Collection.items if contains valid objects.', function() {
			const newArr = [{id:1}, {id:2}];
			const col = new Collection();
			col.items = newArr;
			expect(col.items).toBe(newArr);
		});
		it('accepts non-negative integer as custom `quantify`.', function() {
			const customQuantify = 1;
			const col = new Collection();
			col.quantify = customQuantify;
			expect(col.quantify).toBe(customQuantify);
		});
		it('allows quantify after populate items.', function() {
			const customQuantify = 1;
			const newArr = [{id:1}, {id:2}];
			const quantifiedNewCol = [{id:1,quantity:customQuantify}, {id:2,quantity: customQuantify}];
			const col = new Collection();
			col.items = newArr;
			col.quantify = customQuantify;
			expect(col.items).toBe(quantifiedNewCol);
		});
	});
	describe('Collection usage (methods)', function() {
		it('add an object to Collection.items at once.', function() {
			const col = new Collection();
			const validObj = {id:1};
			col.push(validObj);
			expect(col.length).toBe(1);
		});
		it('postitive Collection.quantify adds `quantity` property to objects in Collection.items.', function() {
			const customQuantify = 1;
			const newObj = {id:1};
			const quantifiedNewObj = {id:1,quantity:customQuantify};
			const col = new Collection();
			col.push(newObj);
			col.quantify = customQuantify;
			expect(col.items).toBe([quantifiedNewObj]);
		});
		it('postitive Collection.quantify adds `quantity` property to incoming Collection.items objects.', function() {
			const customQuantify = 1;
			const newObj = {id:1};
			const quantifiedNewObj = {id:1,quantity:customQuantify};
			const col = new Collection();
			col.quantify = customQuantify;
			col.push(newObj);
			expect(col.items).toBe([quantifiedNewObj]);
		});
		it('if Collection.quantify is positive, one could increase a specific item quantity by ammount.', function() {
			const newObj = {id:1};
			const expectedObj = {id:1,quantity:3};
			const col = new Collection();
			col.quantify = 1;
			col.push(newObj);
			col.increase(1, 2);
			expect(col.items).toBe([expectedObj]);
		});
		it('if Collection.quantify is positive, one could decrease a specific item quantity by increasing negative ammount.', function() {
			const newObj = {id:1};
			const expectedObj = {id:1,quantity:1};
			const col = new Collection();
			col.quantify = 2;
			col.push(newObj);
			col.increase(1, -1);
			expect(col.items).toBe([expectedObj]);
		});
		it('if Collection.quantify is positive, one could set a specific item quantity via setAmmount method.', function() {
			const newObj = {id:1};
			const expectedObj = {id:1,quantity:1};
			const col = new Collection();
			col.quantify = 2;
			col.push(newObj);
			col.setAmmount(1, 1);
			expect(col.items).toBe([expectedObj]);
		});
	});
});
