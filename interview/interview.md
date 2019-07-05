# 面经总结
1.0.1、二叉树后序遍历（递归版）
```js
function TreeNode(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

function visit(root){
    if(root){
        visit(root.left);
        visit(root.right);
        console.log(root.val);
    }
}
```
1.0.2、二叉树中序遍历
```js
function TreeNode(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

function inOrder(root){
    if(root){
        inOrder(root.left);
        console.log(root.val);
        inOrder(root.right);
    }
}
```
1.0.3、二叉树先序遍历
```js
function TreeNode(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

function perOrder(root){
    if(root){
        console.log(root.val);
        perOrder(root.left);
        perOrder(root.right);
    }
}
```