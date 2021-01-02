# Collection
A Collection is an array of objects with a primary key property. It can quantify each item inside collection, motived by shopping cart needed functionalities. It can optionally also trigger an update callback function given as constructor optional argument.

## Table of Contents
- [Support](#support)
- [Installation](#installation)
	+ [NPM](#npm)
	+ [Git](#git)
	+ [Zip](#zip)
- [Usage](#usage)
	+ [Callback](#callback)
	+ [Custom Initial Content](custom-initial-content)
- [Plan](#plan)
- [Contribute](#contribute)
- [Author](#author)

## <a name="support"></a> Support
If you need some help or found bug you can [open an issue](/issues/new/choose).

## <a name="installation"></a> Installation
There are some installation ways. You can choose the best way for you.

### <a name="npm"></a> NPM (recommended)
This way requires [NodeJS](https://nodejs.org/) installed:
```bash
$ npm install collection
```
or using [Yarn](https://yarnpkg.com/)
```bash
$ yarn add collection
```

### <a name="git"></a> Git
Clone the repo into your project:
```bash
$ git clone https://github.com/enriquerene/collection.git
```

### <a name="zip"></a> Zip
Dowload the package and uncpack it into your project:
[Dowload ZIP](https://github.com/enriquerene/collection/archive/main.zip)

## <a name="usage"></a> Usage
Here we cover how to properly use Collection library. `Collection` identify uniquely each item via `primaryKey` with default value `'id'`. I's possible set whole items list as array of objects via `items` setter or pushing one object at time via `push` method. You can set a default quantity for incoming objects. The `Collection` instance optionally can receive a second argument used as update collection items callback. The default behavior does not include callback, you must pass an one parameter function to constructor. Let's see some examples:

### <a name="checking-primary-key"></a> checking-primary-key
The objects must own `primaryKey` property and have unique values. Use `primaryKey` to work with:
```javascript
import Collection from 'collection';

const coll = new Collection();

console.log(coll.primaryKey); // 'id'
coll.primaryKey = 'uniqueKey';
console.log(coll.primaryKey); // 'uniqueKey'
```

### <a name="push-one-at-time"></a> push-one-at-time
Push `items` into items collection using `push`.
```javascript
import Collection from 'collection';

const coll = new Collection();

coll.push({id:1});
coll.push({id:2});
coll.push({id:3});
console.log(coll.items); // [{id:1}, {id:2}, {id:3}]
```

### <a name="set-entire-items-list"></a> set-entire-items-list
Set `items` to the array you want to be the items collection:
```javascript
import Collection from 'collection';

const coll = new Collection();

coll.items = [{id:1}, {id:2}, {id:3}];
console.log(coll.items); // [{id:1}, {id:2}, {id:3}]
```

### <a name="reset-collection-items"></a> Reset Collection items
Set `items` to empty array to "clear/reset" collection:
```javascript
import Collection from 'collection';

const coll = new Collection();

coll.push({id:1});
console.log(coll.items); // [{id:1}]
coll.items = [];
console.log(coll.items); // []
```

### <a name="working-with-callback"></a> Working with callback
Set a callback and instantiate an Collection object:
```javascript
import Collection from 'collection';

const updateCallback = (_v) => { console.log(_v) };
const coll = new Collection(updateCallback);

coll.push({id:1}); // console logs '[{id:1}]'
```


## <a name="plan"></a> Plan
Some features what are expected for future versions:
- official [TypeScript](https://www.typescriptlang.org/) version;
Feel free to suggest features for futures versions, just [open an issue](/issues/new/choose).

## <a name="contribute"></a> Contribute
If you have something good to share in this project, you are welcome. Just do a [pull request](/pulls) with your code.

## <a name="author"></a> Author
You can find more projects from Collection's author. Learn more about in (https://enriquerene.com.br)[https://enriquerene.com.br].

