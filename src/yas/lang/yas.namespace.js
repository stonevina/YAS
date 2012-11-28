var yas = window.yas || {};

yas.namespace = function(ns) {

    if (!ns || !ns.length) {
        return null;
     }

    var levels = ns.split(".");
    var nsobj = yas;

    // yas is implied, so it is ignored if it is included
    for (var i=(levels[0] == "yas") ? 1 : 0; i<levels.length; ++i) {
         //如果undefined,就new 对象
         nsobj[levels[i]] = nsobj[levels[i]] || {};
         nsobj = nsobj[levels[i]];
     }

    return nsobj;
};

//注册yas.util
yas.namespace("util");