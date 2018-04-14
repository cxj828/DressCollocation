/**
 * Created by candy on 2018/4/13.
 */
var matchUser = matchUser || {
        init: function () {
            matchUser.initCreateMatchUserFun();
        },

        /**
         * 创建用户
         */
        initCreateMatchUserFun: function () {
            var UUID = matchUser.initUserUuidFun();
            console.log(UUID);
            //执行发送验证码操作
            const CREATE_USER_URL = SERVER_DOMAIN + "/match/api/user-insert.post";
            $.ajax({
                'url': CREATE_USER_URL,
                'data': JSON.stringify({"uuid": UUID}),
                'contentType': "application/json; charset=utf-8",
                'type': 'POST',
                'cache': false,
                'dataType': 'json',
                'success': function (data) {
                    console.log(JSON.stringify(data));
                },
                'error': function (e) {
                    console.log(JSON.stringify(e))
                }
            });

        },

        /**
         * 创建海报之后上传到服务器
         */
        exeAddUserPosterFun: function (poster1, poster2, name) {
            var UUID = matchUser.initUserUuidFun();
            const ADD_POSTER_URL = SERVER_DOMAIN + "/match/api/poster-add.post";
            $.ajax({
                'url': ADD_POSTER_URL,
                'data': JSON.stringify({
                    "uuid": UUID,
                    "poster": poster1.src,
                    // "poster2": poster2.src,
                    'matchDesc': name
                }),
                'contentType': "application/json; charset=utf-8",
                'type': 'POST',
                'cache': false,
                'dataType': 'json',
                'success': function (data) {
                    console.log(JSON.stringify(data));
                },
                'error': function (e) {
                    console.log(JSON.stringify(e))
                }
            });
        },

        /**
         * 获取用户的UUID
         */
        initUserUuidFun: function () {
            var userUUID = localStorage.getItem("USER_UUID");
            if (matchUser.isBlank(userUUID)) {
                userUUID = matchUser.createUuidFun();
                localStorage.setItem("USER_UUID", userUUID);
            }
            return userUUID;
        },


        /**
         * 生成一个UUIDF
         * @returns {string}
         */
        createUuidFun: function () {
            var s = [];
            var hexDigits = "0123456789abcdefABCDEFGHIJKLMOPQRSTUVWXYZ";
            for (var i = 0; i < 64; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * hexDigits.length), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "";
            var uuid = s.join("");
            return uuid;
        },

        /**
         * 判断字符串是否为空
         */
        isBlank: function (str) {
            if (str == null || str == undefined || str == '') {
                return true;
            }
            if ($.trim(str) == '') {
                return true;
            }
            return false;
        },

        isNotBlank: function (str) {
            return !matchUser.isBlank(str);
        },

    }

$(function () {
    matchUser.init();
})