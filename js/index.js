// 获取按钮，设置点击事件
var btn = document.getElementById("todoBtn");
btn.onclick = function() {
  // 获取输入框的输入的内容
  var todo = document.getElementById("todo").value.trim();
  // 验证非空
  if (!todo) {
    console.log("仅空格，不输出");
    return;
  }
  // 获取时间
  var date = new Date();
  // 生成对应的标签（内容+时间），此时时间还是时间戳
  var li =
    "<li class='todo'><span>" +
    new Date().fmt("yyyy-MM-dd hh:mm:ss") +
    "</span>" +
    todo +
    "</li>";
  // 获取文本框原有的内容
  var todoes = document.getElementById("todoes");
  // 把输入框新内容加进文本框
  var html = todoes.innerHTML + li;
  todoes.innerHTML = html;
  // 发送后，输入框置空
  document.getElementById("todo").value = "";
};

// 拥有进行时和完成时
var ul = document.getElementById("todoes");
// 事件委托  对li设置点击事件
ul.addEventListener("click", function(e) {
  if (e.target.tagName == "LI") {
    if (hasClass(e.target.classList, "pedding")) {
      e.target.classList.remove("pedding");
      e.target.classList.add("done");
      console.log("进行时 =》 已完成");
    }
    if (
      !hasClass(e.target.classList, "done") &&
      !hasClass(e.target.classList, "pedding")
    ) {
      e.target.classList.add("pedding");
      console.log("未完成 =》 进行时");
    }
  }
});

/**封装好的方法 */
// 日期格式化
Date.prototype.fmt = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

// 去除空格方法
String.prototype.trim = function() {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

function hasClass(array, className) {
  for (var i = 0; i < array.length; i++) {
    if (array[1] === className) {
      return true;
    }
    return false;
  }
}
