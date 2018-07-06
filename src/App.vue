<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {};
    },
    mounted() {
      var fun = function(doc, win) {
        var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
            var clientWidth = docEl.clientWidth > 640 ? 640 : docEl.clientWidth;
            if (!clientWidth) return;
  
            //这里是假设在640px宽度设计稿的情况下，1rem = 10px；
            //可以根据实际需要修改
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            console.log(100 * (clientWidth / 640) + 'px');
          };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      }
      fun(document, window);
    },
  };
</script>

<style>
  html {
    font-size: 100px;
  }
  
  body {
    font-size: 0.16rem;
  }
  
  html,
  body,
  p {
    margin: 0;
    padding: 0;
    color: #79d1d5;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  @media only screen and (min-width:640px) {
    html,
    body {
      width: 640px;
      margin: 0 auto;
    }
  }
  
  @media only screen and (max-width:639px) {
    html,
    body {
      width: 100%;
    }
  }
  
  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul,
  li {
    list-style-type: none;
    padding: 0;
  }
  
  a {
    color: #42b983;
  }
  
  input {
    outline: none;
  }
  
  .relative {
    position: relative;
  }
  
  .mleft5 {
    margin-left: 0.05rem;
  }
  
  .mleft10 {
    margin-left: 0.1rem;
  }
  
  .mb0 {
    margin-bottom: 0 !important;
  }
  
  .mb10 {
    margin-bottom: 10px;
  }
  
  .left {
    text-align: left;
  }
  
  .right {
    text-align: right;
  }
  
  .f18 {
    font-size: 0.18rem;
  }
  
  .f20 {
    font-size: 0.2rem;
  }
  
  .f24 {
    font-size: 0.24rem;
  }
  
  .f30 {
    font-size: 0.30rem;
  }
  
  .grey {
    color: #a3a4a6;
  }
  
  .w54 {
    width: 0.54rem;
  }
  
  .w80 {
    width: 0.8rem;
  }

  .wp100{ width: 100%;}
  
  .displaybox {
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .boxflex01 {
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    -moz-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: block;
  }
  
  .boxalign {
    -webkit-box-align: center !important;
    box-align: center !important;
    -webkit-align-items: center !important;
    align-items: center !important
  }
  
  .boxalignstart {
    -webkit-box-align: start !important;
    box-align: start !important;
    -webkit-align-items: flex-start !important;
    align-items: flex-start !important
  }
  
  .boxalignend {
    -webkit-box-align: end !important;
    box-align: end !important;
    -webkit-align-items: flex-end !important;
    align-items: flex-end !important
  }
  
  .label_name {
    display: block;
    min-width: 0.9rem;
    text-align: justify;
    text-align-last: justify;
    font-size: 0.3rem;
  }
  
  .input_normal {
    border: 1px solid #9e9fa1;
    padding: 0.08rem 0;
    border-radius: 0.02rem;
    text-indent: 0.5em;
  }
  
  .head_img {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 1rem;
  }

  .form_list{ min-height: calc(260*100vh/640); padding-bottom: 0.15rem; }
</style>
