//全局变量
var app = window.app || {};
app.width = window.innerWidth;
app.height = window.innerHeight;
app.pixelRatio = window.devicePixelRatio || 1;
app.isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
app.isAndroid = navigator.userAgent.toLowerCase().match(/Android/i) == "android";
app.isPC = !app.isIOS && !app.isAndroid;
app.isWX = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
app.isZZXC = navigator.userAgent.toLowerCase().match(/zzxc/i) == "zzxc";
app.isTOUCH = "ontouchend" in document;
app.systemScroll = false;
app.poster = {
    img1: undefined,
    img2: undefined,
    role: undefined,
    sex: 0,
    name: '',
    label: '',
    wordCheck: false,
    bg: 5,
    items: [
        [
            [1, 2, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            [3, 4],
        ],
        [
            [3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19],
            [6, 7, 8]
        ],
        [
            [74, 75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 66, 67, 68],
            [72, 73, 41, 42, 43, 44, 45, 60, 61, 62, 63, 64, 65, 69, 70, 71]
        ],
        [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
        ],
        [
//			[34,35,36,37,38,39,1,2,4,5,6,7,10,12,13,14,15,16,18,19,21,22,23,24,25,26,27,28,29,30,31,32],
//			[34,35,36,37,38,39,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,21,22,23,24,25,26,27,28,29,30,31,32]
            [1, 5, 6, 7, 8, 9, 10],
            [2, 3, 4]
        ]
    ],
    exLevel: [
        {},
        {8: 51, 28: 51, 33: 51, 34: 51, 36: 51, 37: 51, 38: 51, 40: 51, 41: 51, 42: 51, 43: 51, 48: 53, 58: 53},
        {2: 21},
        {27: 9, 28: 9},
        {
            1: 39,
            3: 39,
            5: 39,
            6: 39,
            9: 39,
            10: 39,
            11: 39,
            17: 39,
            12: 60,
            13: 60,
            14: 60,
            27: 60,
            29: 60,
            30: 60,
            31: 60,
            32: 60,
            35: 60,
            36: 39,
            37: 60,
            38: 60,
            39: 60,
            34: 39
        }
    ],
    exCost: {
        33: {1: {isOff: false, ids: [1]}},
        36: {1: {isOff: false, ids: [1, 25]}},
        37: {1: {isOff: false, ids: [1, 25]}},
        38: {1: {isOff: false, ids: [1, 25]}},
        40: {1: {isOff: false, ids: [1]}},
        41: {1: {isOff: false, ids: [1]}},
        42: {1: {isOff: false, ids: [1]}},
        43: {1: {isOff: false, ids: [1]}},
        48: {
            1: {isOff: false, ids: []},
            3: {isOff: false, ids: []},
            4: {isOff: false, ids: []},
            5: {isOff: false, ids: [30, 31, 32, 37, 38, 39]}
        },
        58: {
            1: {isOff: false, ids: []},
            3: {isOff: false, ids: []},
            4: {isOff: false, ids: []},
            5: {isOff: false, ids: [30, 31, 32, 37, 38, 39]}
        }
    },
    exPants: {
        11: 31, 19: 31,
        aboutCost: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            49: true,
            50: true,
            51: true,
            52: true,
            53: true,
            54: true,
            55: true
        }

    },
    exAcc: {
        1: 52, 3: 52, 9: 52, 10: 52, 11: 52, 36: 52,
        aboutCost: {
            8: true,
            28: true,
            33: true,
            34: true,
            36: true,
            37: true,
            38: true,
            40: true,
            41: true,
            42: true,
            43: true
        }
    }
};


/***** 环境设置 *****/
window.addEventListener('touchmove', function (e) { //禁止系统滚动
    !app.systemScroll && e.preventDefault();
}, {passive: false});
app.isIOS && document.querySelector('html').addEventListener('touchend', function (e) { //禁止ios双击屏幕上弹
    var time = new Date().getTime();
    if (!app._last_touchend_time) {
        app._last_touchend_time = time;
        return;
    }
    if (time - app._last_touchend_time < 500 && e.cancelable) {
        e.preventDefault();
    }
    app._last_touchend_time = time;
}, false);
app.setSizeCallback = undefined;
app.setSize = function () {
    if (window.$ && $('.s3>center').is(':visible')) {
        return;
    }
    var fun = function () {
        var aspect = 0.7;
        var el_app = document.querySelector('.app');
        app.width = window.innerWidth;
        app.height = window.innerHeight;
        if (app.width / app.height > aspect) {
            app.width = app.height * aspect;
        }
        if (el_app) {
            el_app.style.width = app.width + 'px';
            el_app.style.height = app.height + 'px';
            el_app.style.fontSize = app.width / 320 * 12 + 'px';
        }
        ;
        typeof(app.setSizeCallback) == 'function' && app.setSizeCallback();
    }
    fun();
    if (app.isIOS) {
        setTimeout(fun, 200);
    } else {
        fun();
    }
};
window.addEventListener('resize', app.setSize, false);


/***** 获取URL参数 *****/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return undefined;
};


/***** 音频设置 *****/
app.sound = {};
app.sound._mute = false;
app.sound._loaded = false;
app.sound.click = new Audio('sound/click.mp3');
//app.sound.bg = new Audio('sound/bg.mp3');
//app.sound.bg.loop = true;
app.sound.Load = function () {
    if (app.sound._loaded) {
        return;
    }
    for (var i in app.sound) {
        if (!app.sound[i].play) {
            continue;
        }
        if (!app.sound[i]._play) {
            app.sound[i]._play = app.sound[i].play;
            app.sound[i].play = function () {
                !app.sound._mute && this._play();
            }
            app.sound[i].addEventListener('ended', function (e) {
                e.target.loop && e.target.play();
            });
            app.sound[i].load();
        }
    }
    app.sound._loaded = true;
    window.removeEventListener('touchstart', app.sound.Load, false);
};
window.addEventListener('touchstart', app.sound.Load, false);


//加载资源
app.loadRes = function () {
    var img_index = 4;
    window.time = setInterval(function () {
        $('.load figure').css('background-image', 'url(img/load' + img_index + '.png)');
        // img_index++;
        // if (img_index > 4) {
        //     img_index = 1;
        // }
    }, 200);
    var load, load_text, load_line, res;
    if (document.readyState != 'complete') {
        window.addEventListener('load', app.loadRes, false);
        return;
    }
    app.setSize();
    load = document.querySelector('.load');
    load_text = document.querySelector('.load center var');
    load_line = document.querySelector('.load center p i');
    appLoad(['img/load4.png'], undefined, function () {
        load.style.display = 'block';
        var time_index = 1;
        window.time2 = setInterval(function () {
            if (time_index >= 3) {
                clearInterval(window.time2);
            }
            if (time_index <= 3) {
                time_index++;
                $(load).find('span').append('.');
            }
        }, 500);

        loadSourceFun();

        // load.addEventListener('webkitAnimationEnd', function () {
        //
        // });
    });
};

function loadSourceFun() {
    res = [
        'css/main.css',
        'js/jquery.2.1.1.min.js',
        'js/jquery.transit.min.js',
        'js/iscroll-lite.js',
        'js/main.js',
        'img/loading.png',
        'img/logo.png',
        'img/btn.png',
        'img/ewm.png',
        'img/item-class.png',
        'img/role1.png',
        'img/role2.png',
        'img/title.png',
        'img/title2.png',
        'img/sex.png',
        'img/share.png',
        'img/bg/bg-1.png',
        'img/bg/bg-2.png',
        'img/bg/bg-3.png',
        'img/bg/bg-4.png',
        'img/bg/bg-5.png',
        'img/creating_bg.png'
    ];
    appLoad({
        res: res,
        delayLoad: 800,
        delayLoaded: 800,
        onError: function () {
            window.appStart && appStart();
            // clearInterval(time)
        },
        //onLoading: function(p){	},
        onLoaded: function () {
            window.appStart && appStart();
            // clearInterval(time)

        }
    });
}


//分享
/*app.shareData = {
 title: '制造「我」的草莓音乐节',
 desc: '2018以「我」出发，一起大不同',
 imgUrl: 'cover.jpg',
 link: location.origin+location.pathname
 };
 app.shareData.imgUrl = app.shareData.link.substr(0, app.shareData.link.lastIndexOf('/')+1)+app.shareData.imgUrl;*/


//启动
if (app.isPC) {
    app.sound.Load();
}
if (app.isWX) {
    appLoad('//res.wx.qq.com/open/js/jweixin-1.0.0.js', null, function () {
        /*wx.config({debug: false});
         wx.ready(app.sound.Load);
         wx.error(app.sound.Load);*/
        app.loadRes();
    });
} else if (app.isZZXC) {
    app.loadRes();
} else {
    app.loadRes();
}


//分享
//获取参数方法
function getValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}

function getCurrUrl() {
    var _url = window.location.href;
    if (/detail\.html/.test(_url) && /if_share/.test(_url)) {
        _url = _url.split('?')[0] + '?albumId=' + util.getValue('albumId') + '__1';
    } else if (/singerId/.test(_url) && /if_share/.test(_url)) {
        _url = _url.split('?')[0] + '?singerId=' + util.getValue('singerId') + '__1';
    } else if (/news/.test(_url) && /if_share/.test(_url)) {
        _url = _url.split('?')[0] + '?id=' + util.getValue('id') + '__1';
    } else {
        _url = _url.split('?')[0];
    }
    return _url;
}

function share() {
    // var _url = window.location.href;
    // var fromshare = getValue('from');
    // if (fromshare) {
    //     //window.location.href = _url;
    // } else {
    //     var currUrl = getCurrUrl();
    //     $.ajax({
    //         'url': SERVER_DOMAIN + "/match/api/weixin/verify-share-config.post",
    //         'data': JSON.stringify({'currUrl': currUrl}),
    //         'contentType': "application/json; charset=utf-8",
    //         'type': 'POST',
    //         'cache': false,
    //         'dataType': 'json',
    //         'success': function (data) {
    //             exeMatchWeiXinShareFun(data);
    //         },
    //         'error': function (e) {
    //             console.log(JSON.stringify(e))
    //         }
    //     });
    // }

    var currUrl = getCurrUrl();
    $.ajax({
        'url': SERVER_DOMAIN + "/match/api/weixin/verify-share-config.post",
        'data': JSON.stringify({'currUrl': currUrl}),
        'contentType': "application/json; charset=utf-8",
        'type': 'POST',
        'cache': false,
        'dataType': 'json',
        'success': function (data) {
            exeMatchWeiXinShareFun(data);
        },
        'error': function (e) {
            console.log(JSON.stringify(e))
        }
    });
}

function exeMatchWeiXinShareFun(data) {

    var tit = tit ? tit : "制造「我」的专属倔强搭配";
    var img = img ? img : 'http://wap.zhengzai.tv/pages/strawberry2018/cover.jpg';
    var des = des ? des : "2018以「我」出发，一起大不同";
    var url = getCurrUrl();

    if (data.codeNumber != 1000) {
        console.log(JSON.stringify(data));
        return false;
    }

    var respData = data.respData;
    var appId = respData.appId;
    var timestamp = respData.timestamp;
    var nonceStr = respData.nonceStr;
    var signature = respData.signature;
    wx.config({
        debug: false, // 开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.error(function (res) {
        /*alert(res);*/
    });
    wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: tit,
            link: url,
            imgUrl: img,
            success: function () {
                //alert("分享成功")
            },
            cancel: function (data) {
                alert('分享失败');
            }
        });
        // 分享给好友
        wx.onMenuShareAppMessage({
            title: tit,
            link: url,
            desc: des,
            imgUrl: img,
            success: function () {
                //alert("分享成功")
            },
            cancel: function () {
                alert('分享失败');
            }
        });
        // 分享给QQ好友
        wx.onMenuShareQQ({
            title: tit,
            link: url,
            desc: des,
            imgUrl: img,
            success: function () {
                //alert("分享成功")
            },
            cancel: function () {
                alert('分享失败');
            }
        });
        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: tit,
            link: url,
            desc: des,
            imgUrl: img,
            success: function () {
                //alert("分享成功")
            },
            cancel: function () {
                alert('分享失败');
            }
        });
    })
}

share();
