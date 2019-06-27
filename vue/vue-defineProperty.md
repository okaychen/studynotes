# vue双向绑定（v-model）

vue通过v-model在表单`<input>`,`textarea`,`select`元素上创建双向数据绑定。主要是用过`数据劫持结合发布-订阅模式`的方式，通过`Object.defineProperty()`来劫持各个属性的`getter`，`setter`。在由用户触发的数据变动时，发布消息给订阅者，触发相应监听回调。当把一个普通的JavaScript对象传给vue实例来作为它的data选项时，vue将遍历它的属性，用Object.defineProperty将他们转化为getter和setter。虽然用户看不到，但是在内部它们让vue追踪依赖，在属性被访问和修改时通知变化。

## js实现简单的数据绑定
js实现数据绑定有三种方式，手动绑定，脏值检测，前端数据劫持（defineProperty）
数据劫持方式简单实现
```html
<input type="text" id="aa">
<p id="bb"></p>
```

```js
var obj = {},
    iTxt = document.getElementById('aa'),
    pTxt = document.getElementById('bb');

function def(key, getCon, showCon) {
    Object.defineProperty(obj, key, {
        get: function () {
            return obj
        },
        set: function (val) {
            getCon.value = val
            showCon.innerHTML = val
        }
    })
}

iTxt.addEventListener('keyup', function (e) {
    obj.txt = e.target.value
})

def('txt', iTxt, pTxt)
```

### 脏值检测
对于以angular为代表的"脏值检测"，数据发生更改后，对于所有数据和视图的绑定关系进行一次检测，识别是否有数据发生了改变，有变化进行处理，可能进一步引发其他数据的改变，所以这个过程会循环几次，一直到不在有数据发生改变，将变更后的数据发给视图，更新页面展现。如果是手动对viewmodel数据进行更改，为确保变更同步到视图，需要手动触发一次"脏值检测"