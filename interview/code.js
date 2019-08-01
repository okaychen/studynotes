//2N个元素的数组随机两两随机分组
function arrSlice(arr) {
    return arr
        .sort(() => Math.random() > 0.5 ? -1 : 1) // 打乱
        .map((e, i) => i % 2 ? null : [arr[i], arr[i + 1]]) // 两两取出  （i取模2，有余数的话返回null，否者数组中取出两个元素）
        .filter(Boolean)
}

//promise.all的实现
function promiseAll(promises) {
    return new Promise(function (reject, resolve) {
        if (!isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedcount = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
            (function () {
                Promise.resolve(promises[i]).then(function (value) {
                    resolvedcount++;
                    resolvedValues[i] = value;
                    if (resolvedcount == promiseNum) {
                        return resolve(resolvedValues)
                    }
                }, function (reason) {
                    reject(reason);
                })
            })(i)
        }
    })
}

// object.defineProperty实现双向数据绑定
let obj = {};

function def(key, getCon, showCon) {
    Object.defineProperty(obj, key, {
        get: function () {
            return obj;
        },
        set: function (val) {
            getCon.value = val;
            showCon.innerHTML = val;
        }
    })
}

Element1.addEventListener('keyup', function (e) {
    obj.txt = e.target.value
})

def('txt', Element1, Element2);

// 深度优先遍历_递归版
function deepTraversal(node) {
    let nodes = [];
    if (node != null) {
        nodes.push[node];
        let childrens = node.children;
        for (let i = 0; i < childrens.length; i++) {
            deepTraversal(childrens[i]);
        }
    }
    return nodes;
}

// 二叉树遍历_后序递归版
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function visit(root) {
    if (root) {
        visit(root.left);
        visit(root.right);
        console.log(root.val);
    }
}

// 快排_递归版，挑选基准值，比其大的放后面，小的放前面
function quickSort(arr) {
    let len = arr.length;
    if (len < 2) {
        return arr
    }
    let pivotIndex = Math.floor(len / 2);
    let pivot = arr.splice(pivotIndex, 1)[0]; //选取基准值，不要选arr[0]为基准，[超出最大调用堆栈大小]
    console.log(pivot);
    let right = [],
        left = [];
    for (let i = 0; i < len; i++) {
        if (arr[i] >= pivot) {
            right.push(arr[i])
        }
        if (arr[i] < pivot) {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

// 去重函数，数组元素可以是数字，字符串，数组，对象（重点是数组）
// 例如[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]则输出[123, [1, 2, 3], [1, "2", 3], "meili"]
// es6实现
function removeDuplicate(arr) {
    return [...(new Set(arr.map(n => JSON.stringify(n))))].map(n => JSON.parse(n))
}

// es5实现－okaychen
function oSort(arr) {
    var tmpObj = {},
        newArr = [];
    arr.forEach(function (a) {
        var key = null;
        if (a instanceof Array || Array.prototype.toString.call(a)) {
            key = JSON.stringify(a)
        } else {
            key = (typeof a) + a
        }
        if (!tmpObj[key]) {
            tmpObj[key] = true;
            newArr.push(a)
        }
    });
    console.log(newArr)
}

// 修改this指向，使指向指定的对象
// bind创建一个函数，使函数无论怎样调用都指向oTarget;apply改变当前作用域至oTarget,此时this指向oTarget
function bindThis(f, oTarget) {
    if (f.bind) {
        return f.bind(oTarget)
    } else {
        return function () {
            return f.apply(oTarget, arguments);
        }
    }
}
