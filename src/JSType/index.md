## 变量类型

Number, String, Boolean, undefined, null, Object, Symbol

## typeof null 为什么输出 object

在 js 中，变量由类型标签和变量值组成。对象的类型标签为 0。

而 null 是一个空指针，在 js 最初版本使用 32 位系统，会使用低位存储变量的类型信息，而 null 也是以 000 开头，因此 null 的类型标签也为 0，会被识别为对象

## JS null 和 undefined 的区别

JS 的最初版本：null 表示一个“无”的对象，转换为数值时为 0；undefined 表示一个“无”的原始值，转换为数值时为 NaN

现在，null 被当作原本就不应有值，常见用法有：

- 作为函数的参数，表示函数的参数不是对象；
- 表示对象原型链的终点。

undefined 表示“缺少值”，即此处应该有值，但还未定义。常见用法有：

- 变量在赋值前进行使用；
- 函数在定义前进行调用；
- 对象属性还未赋值时，该属性值为 undefined；
- 函数无返回值时，默认返回 undefined。

## instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```js
object instanceof constructor;
//某个实例对象        某个构造函数
```

## typeof 用来检测基础类型

但如果使用 字符串的构造函数，使用 instanceof 也可判断其类型。

```js
let a = new String('123123');
a instanceof String; // true

let str = '123123';
str instanceof String; // false  非对象实例，因此返回 false
```

还有一种检测变量的类型的方法,基础类型和引用类型都可以检测出来

```js
Object.prototype.toString.call(myObj) === '[object Array]';
```

## 手动实现一个 instanceof 函数

getPrototypeOf：获取某个实例对象的原型；

isPrototypeOf：检测某一个对象是否存在于另一个对象的原型链上；

```js
function isInstanceOf(a, b) {
  while (true) {
    if (a.__proto__ === b.prototype) return true;
    if (a.__proto__ === null) return false;
    a = a.__proto__;
  }
}

function Person() {
  this.name = '123';
}
let a = new Person();
console.log(a);

isInstanceOf(a, Object);
isInstanceOf(a, Array);
```

这里又会和原型链扯上关系，还有 new 一个对象会发生什么？类的继承有哪些方式？

### 原型链

简单的回顾一下构造函数、原型和实例的关系：

- 每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
- 那么假如我们让原型对象等于另一个类型的实例，结果会怎样？
- 显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。
- 假如另一个原型又是另一个类型的实例，那么上述关系依然成立。
- 如此层层递进，就构成了实例与原型的链条。
  这就是所谓的原型链的基本概念。——摘自《javascript 高级程序设计》

### new 一个对象会发生什么？

1. 创建空对象{}
2. 使用新对象，调用函数，函数中的 this 被指向新实例对象：
   {}.构造函数();
3. 设置新对象的 constructor 属性为构造函数的名称，设置新对象的**proto**属性指向构造函数的 prototype 对象
4. 将初始化完毕的新对象地址，保存到等号左边的变量中

```js
function Person() {
  this.name = '123';
}
// 以下过程类似：let a = new Person()
let a = {};
a.__proto__ = Person.prototype;
Person.call(a);

console.log(a);
```

## 还有一些基础的 js 问题，如下题目：

```js
JSON.stringify({a:undefined, b:null})   // b会存在

// JSON.stringify(value[, replacer[, space]])

[stringify](https://www.runoob.com/js/javascript-json-stringify.html)
// replacer: 如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""

// 在 JSON 中，不允许日期对象。JSON.stringify() 函数将把任何日期转换为字符串。
var obj =  { "name":"Bill Gates", "today":new Date(), "city":"Seattle"};
JSON.stringify(obj);
// "{\"name\":\"Bill Gates\",\"today\":\"2021-06-06T08:13:56.784Z\",\"city\":\"Seattle\"}"


// 在 JSON 中，不允许函数作为对象值。JSON.stringify() 函数将从 JavaScript 对象删除任何函数，包括键和值：

var obj1 =  { "name":"Bill Gates", "age":function () {return 62;}, "city":"Seattle"};
JSON.stringify(obj1);
"{\"name\":\"Bill Gates\",\"city\":\"Seattle\"}"

```
