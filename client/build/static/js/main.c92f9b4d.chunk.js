(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){},23:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},27:function(e,t,n){e.exports=n(42)},32:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(22),c=n.n(o),s=(n(32),n(7)),i=n(8),l=n(11),u=n(9),p=n(12),m=n(23),h=n.n(m),f=(n(20),n(10)),d=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:h.a,className:"App-logo",alt:"logo"}),r.a.createElement("h4",{className:"App-title"},"Buscar Reposit\xf3rios em Destaque"),r.a.createElement("button",null,r.a.createElement(f.b,{to:"/repositories"},"Buscar Reposit\xf3rios em Destaque"))))}}]),t}(a.Component),b=n(5),v=n.n(b),j=n(14),E=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).callApi=Object(j.a)(v.a.mark(function e(){var t,n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/search/highlights-repositories");case 2:return t=e.sent,e.next=5,t.json();case 5:if(n=e.sent,200===t.status){e.next=8;break}throw Error(n.message);case 8:return e.abrupt("return",n);case 9:case"end":return e.stop()}},e)})),n.handleSubmit=function(){var e=Object(j.a)(v.a.mark(function e(t){var a,r;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("/api/world",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({post:n.state.post})});case 3:return a=e.sent,e.next=6,a.text();case 6:r=e.sent,n.setState({responseToPost:r});case 8:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.state={response:[]},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.callApi().then(function(t){e.setState({response:t})}).catch(function(e){return console.error(e)})}},{key:"render",value:function(){return 0!==this.state.response.length?r.a.createElement("ul",null,this.state.response.map(function(e){return r.a.createElement("ul",null,e[0].language,e.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement(f.b,{to:"/repository-detail/".concat(e.id)},e.full_name))}),r.a.createElement("br",null))})):r.a.createElement("div",null)}}]),t}(a.Component),O=n(26),g=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).callApi=Object(j.a)(v.a.mark(function e(){var t,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/repository-detail?id=".concat(n.props.match.params.id));case 2:return t=e.sent,e.next=5,t.json();case 5:if(a=e.sent,200===t.status){e.next=8;break}throw Error(a.message);case 8:return e.abrupt("return",a);case 9:case"end":return e.stop()}},e)})),n.state={response:[]},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.callApi().then(function(t){console.log(t),e.setState({response:t})}).catch(function(e){return console.error(e)})}},{key:"_renderObject",value:function(){return console.log(this.state.response),Object.entries(this.state.response).map(function(e,t){var n=Object(O.a)(e,2),a=n[0],o=n[1];return console.log(a,o),r.a.createElement("ul",null,r.a.createElement("div",{key:a},r.a.createElement("li",null,a,": ",o," ;")))})}},{key:"render",value:function(){return 0!==this.state.response.length?r.a.createElement("div",null,this._renderObject()):r.a.createElement("div",null)}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=n(6);c.a.render(r.a.createElement(f.a,null,r.a.createElement(w.c,null,r.a.createElement(w.a,{path:"/",exact:!0,component:d}),r.a.createElement(w.a,{path:"/repositories",component:E}),r.a.createElement(w.a,{path:"/repository-detail/:id",component:g}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,1,2]]]);
//# sourceMappingURL=main.c92f9b4d.chunk.js.map