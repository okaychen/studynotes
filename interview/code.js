//2N个元素的数组随机两两随机分组
function arrSlice(arr) {
    return arr
        .sort(() => Math.random() > 0.5 ? -1 : 1) // 打乱
        .map((e, i) => i % 2 ? null : [arr[i], arr[i + 1]]) // 两两取出  （i取模2，有余数的话返回null，否者数组中取出两个元素）
        .filter(Boolean)
}