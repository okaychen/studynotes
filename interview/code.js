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