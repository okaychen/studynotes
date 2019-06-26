# vue生命周期

## mounted钩子
关于`$el`和`$ref`,两者都是在实例渲染后即mounted钩子函数才会出现，渲染完成后当前组件被`vm.$el`代替,其他实例使用该实例组件即可以用`vm.$el`.
**此过程进行ajax交互**
`this.$el`指代当前组件中的元素
`this.$refs.xxx`来访问特定的子元素
```html
 <div id="vm" ref="box">
    {{ message }}
    <input type="button" value="立即加入" ref="btn" />
</div>
```
```js
var vm = new Vue({
    el: "#vm",
    data: {
         message: "hello vue!"
    },
    mounted() {
        this.$el.style.backgroundColor = "yellowgreen";
        this.$refs.btn.style.color = "red";
    },
})
```
vue2使用新的mounted钩子函数代替，使用mounted不能保证钩子函数中的`this.$el`在document中。为此引入了`Vue.nextTick/vm.$nextTick`.
```js
mounted:function(){
    this.$nextTick(function(){
        // 保证　this.$el　在document中
    })
}
```

## updated钩子
数据更改导致虚拟dom重新渲染和打补丁，在这之后会调用这个钩子

当这个钩子被调用时，组件DOM已经更新，现在可以执行依赖于DOM的操作。多数情况下会避免在此期间更改状态。如果要相应状态改变，通常最好使用`计算属性`或`watcher`取而代之。

同时updated不会承诺所有的子组件也都一起被**重绘**，如果你希望等到整个视图都重绘完毕，可以用 `vm.$nextTick` 替换掉 `updated`
```js
updated : function(){
    this.nextTick(function(){

    })
}
```

### 补充：关于（回流）渲染和重绘
reflow回流相比repaint重绘最大的区别就是，回流会影响dom结构的渲染，同时它会触发重绘，它会改变它本身与所有的父辈元素，开销昂贵，必然会导致性能下降，页面元素越多会越明显。

repaint在发生更改时，元素的外观被改变，且在没有改变布局的情况下发生。如改变outline,visibility,background,color,不会影响dom结构渲染。

## vue生命周期常见问题

1、什么是vue生命周期?

> 答：vue实例从创建到销毁的过程就是生命周期。从开始创建，初始化数据，编译模板，挂载DOM->渲染，更新->渲染，销毁等一系列过程，称之为vue生命周期

2、vue生命周期的作用？

> 答：它的生命周期中有多个事件钩子，我们在控制整个vue实例的过程时可以形成更好的逻辑

3、vue生命周期共多少个阶段？

> 答：总共分为8个阶段，创建前/后，载入前/后，更新前/后，销毁前/后

4、第一次页面加载会触发哪几个钩子？

> 答：会触发前四个阶段，即beforeCreate,created,beforeMount,mounted

5、DOM渲染在哪个周期中就已经完成？

> 答：DOM渲染在mounted中就已经完成