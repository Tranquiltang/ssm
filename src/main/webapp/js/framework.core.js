/**
 * 定义全局的JavaScript对象cuckoo
 */
var cuckoo = cuckoo || {};

/**
 * cuckoo.namespace
 */
cuckoo.namespace = function(namespace){
    var parent = cuckoo;
    var namespaces = namespace.split('.');



    // we want to be able to include or exclude the root namespace
    // So we strip it if it's in the namespace
    if (namespaces[0] === 'bies'){
        namespaces = namespaces.slice(1);
    }

    // loop through the parts and create a nested namespace if necessary
    for (var i = 0, len = namespaces.length; i < len; i++){
        var spacename = namespaces[i];

        // check if the current parent already has the namespace declared, if not create it
        if (typeof parent[spacename] == "undefined"){
            parent[spacename] = parent[spacename] || {};
        }
        // get a reference to the deepest element in the hierarchy so far
        parent = parent[spacename];
    }
    // the parent is now completely constructed with empty namespaces and can be used.
    return parent;
};

//常用函数库
cuckoo.namespace('framework.core');
var $K = cuckoo.framework.core;

//以后重点要看的
/**
 * 封装Ajax请求
 */
/*
$K.request = null;
$K.Request = function(){
    $K.Request.prototype.CONST = {
        TYPE : {
            POST : 'POST',
            GET : 'GET'
        },
        DATATYPE : {
            XML : 'xml',
            HTML : 'html',
            SCRIPT : 'script',
            JSON : 'json',
            JSONP : 'jsonp',
            text : 'text'
        },
        PROCESS : {
            PROCESS : true,
            NOPROCESS : false
        },
        CACHED : {
            CACHE : true,
            NOCACHE : false
        },
        ASYNC : {
            ASYNC : true,
            SYNC : false
        }
    };

    /!**
     * Get ajax异步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param scallback 成功回调函数
     * @param ecallback 失败回调函数
     *!/
    $K.Request.prototype.getAjax = function(url, data, dataType, scallback, ecallback){
        $.ajax({
            type : $K.request.CONST.TYPE.GET,
            url : url,
            data : data,
            dataType : dataType,
            //contentType : "application/json;charset=utf-8",
            async : $K.request.CONST.ASYNC.ASYNC,
            success : function(doc){scallback(doc);},
            error: function (req, status, e) {
                try {
                    //只针对能转成json的封装错误信息进行前台抛出
                    var doc = $.parseJSON(req.responseText);
                    ecallback(doc, status, e);
                } catch (e) {
                }
            }
        });
    };


    /!**
     * Get ajax同步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param scallback 成功回调函数
     * @param ecallback 失败回调函数
     *!/
    $K.Request.prototype.syncgetAjax = function(url, data, dataType, scallback, ecallback){
        $.ajax({
            type : $K.request.CONST.TYPE.GET,
            url : url,
            data : data,
            dataType : dataType,
            //contentType : "application/json;charset=utf-8",
            async : $K.request.CONST.ASYNC.SYNC,
            success : function(doc){scallback(doc);},
            error: function (req, status, e) {
                try {
                    //只针对能转成json的封装错误信息进行前台抛出
                    var doc = $.parseJSON(req.responseText);
                    ecallback(doc, status, e);
                } catch (e) {
                }
            }
        });
    };

    /!**
     * Post ajax异步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param scallback 成功回调函数
     * @param ecallback 失败回调函数
     *!/
    $K.Request.prototype.postAjax = function(url, data, dataType, scallback, ecallback){
        $.ajax({
            type : $K.request.CONST.TYPE.POST,
            url : url,
            data : data,
            dataType : dataType,
            //contentType : "application/json;charset=utf-8",
            async : $K.request.CONST.ASYNC.ASYNC,
            success : function(doc){scallback(doc);},
            error: function (req, status, e) {
                try {
                    //只针对能转成json的封装错误信息进行前台抛出
                    var doc = $.parseJSON(req.responseText);
                    ecallback(doc, status, e);
                } catch (e) {
                }
            }
        });
    };

    /!**
     * Post ajax同步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param scallback 成功回调函数
     * @param ecallback 失败回调函数
     *!/
    $K.Request.prototype.syncpostAjax = function(url, data, dataType, scallback, ecallback){
        $.ajax({
            type : $K.request.CONST.TYPE.POST,
            url : url,
            data : data,
            dataType : dataType,
            //contentType : "application/json;charset=utf-8",
            async : $K.request.CONST.ASYNC.SYNC,
            success : function(doc){scallback(doc);},
            error: function (req, status, e) {
                try {
                    //只针对能转成json的封装错误信息进行前台抛出
                    var doc = $.parseJSON(req.responseText);
                    ecallback(doc, status, e);
                } catch (e) {
                }
            }
        });
    };

    /!**
     * Get ajax异步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.get = function(url, data, dataType, callback){
        $K.request.getAjax(url, data, dataType, callback, function(doc, status, e){
            $K.message.showBox(doc.message);
        });
    };

    /!**
     * Get ajax同步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.syncget = function(url, data, dataType, callback){
        $K.request.syncgetAjax(url, data, dataType, callback, function(doc, status, e){
            $K.message.showBox(doc.message);
        });
    };

    /!**
     * Post ajax异步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.post = function(url, data, dataType, callback){
        $K.request.postAjax(url, data, dataType, callback, function(doc, status, e){
            $K.message.showBox(doc.message);
        });
    };

    /!**
     * Post ajax同步请求
     *
     * @param url 请求URL
     * @param data 请求data
     * @param dataType 返回值类型
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.syncpost = function(url, data, dataType, callback){
        $K.request.syncpostAjax(url, data, dataType, callback, function(doc, status, e){
            $K.message.showBox(doc.message);
        });
    };

    /!**
     * Get ajax异步请求结果为JSON
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.getJson = function(url, data, callback){
        $K.request.get(url, data, $K.request.CONST.DATATYPE.JSON, callback);
    };

    /!**
     * Get ajax异步请求结果为JSON
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.syncgetJson = function(url, data, callback){
        $K.request.syncget(url, data, $K.request.CONST.DATATYPE.JSON, callback);
    };

    /!**
     * Post ajax异步请求结果为JSON
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.postJson = function(url, data, callback){
        $K.request.post(url, data, $K.request.CONST.DATATYPE.JSON, callback);
    };

    /!**
     * Post ajax异步请求结果为JSON
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.syncpostJson = function(url, data, callback){
        $K.request.syncpost(url, data, $K.request.CONST.DATATYPE.JSON, callback);
    };

    /!**
     * ajax异步请求结果为HTML
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.postHtml = function(url, data, callback){
        $K.request.post(url, data, $K.request.CONST.DATATYPE.HTML, callback);
    };

    /!**
     * ajax异步请求结果为HTML
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.syncpostHtml = function(url, data, callback){
        $K.request.syncpost(url, data, $K.request.CONST.DATATYPE.HTML, callback);
    };

    /!**
     * ajax异步请求结果为HTML
     *
     * @param url 请求URL
     * @param data 请求data
     * @param callback 成功回调函数
     *!/
    $K.Request.prototype.postXml = function(url, data, callback){
        $K.request.post(url, data, $K.request.CONST.DATATYPE.XML, callback);
    },

        /!**
         * ajax异步请求结果为HTML
         *
         * @param url 请求URL
         * @param data 请求data
         * @param callback 成功回调函数
         *!/
        $K.Request.prototype.syncpostXml = function(url, data, callback){
            $K.request.syncpost(url, data, $K.request.CONST.DATATYPE.XML, callback);
        };

    /!**
     * 请求参数
     *!/
    $K.Request.prototype.Parameter = function(parameter){

        var self = this;
        /!**
         * Parameter Name
         *!/
        var paramName = parameter.paramName || '';

        /!**
         * Parameter Value
         *!/
        var paramValue = parameter.paramValue || '';

        /!**
         * Set parameter name
         *
         * @param name Parameter Name
         *!/
        self.setParamName = function(name){
            paramName = name;
        };

        /!**
         * Returns the parameter name
         *
         * @returns Parameter Name
         *!/
        self.getParamName = function(){
            return paramName;
        };

        /!**
         * Set parameter value
         *
         * @param value Parameter Value
         *!/
        self.setParamValue = function(value){
            paramValue = value;
        };

        /!**
         * Returns the parameter value
         *
         * @returns Parameter Value
         *!/
        self.getParamValue = function(){
            return paramValue;
        };
    },

        /!**
         * 请求对象
         *!/
        $K.Request.prototype.RequestObject = function(url){
            /!**
             * The Instance Of Request Object
             *!/
            var self = this;

            /!**
             * Request URL
             *!/
            var requestUrl = url;

            /!**
             * Request Parameters
             *!/
            var parameters = [];

            /!**
             * Add Parameter
             *
             * @param paramName Parameter Name
             * @param paramValue Parameter Value
             *!/
            self.addParameter = function(paramName, paramValue){
                var param = {'paramName' : paramName, 'paramValue' : paramValue};
                parameters.push(new $K.request.Parameter(param));
            };

            /!**
             * Submit Request
             *!/
            self.submit = function(){
                var form = createForm();
                appendParameter(form);
                form.appendTo($('body'));
                form.attr('action', requestUrl);
                form.attr('method','post');
                form.attr('target',"hframe");
                form[0].submit();
            };

            /!**
             * Append parameters to form
             *
             * @param form Form
             *!/
            var appendParameter = function(form){
                for (var index = 0, len = parameters.length; index < len; index++){
                    var param = parameters[index];
                    $('<input type="hidden" name="' + param.getParamName()
                        + '" value="' + param.getParamValue() + '"/>').appendTo(form);
                }
            };

            /!**
             * Create form for submit
             *!/
            var createForm = function(){
                $('form.hidden-form').remove();
                var form = $("<form class='hidden-form'></form>");
                //创建隐藏的iframe消息提示框
                var iframe = $('<iframe name="hframe" id="hframe" style=" display: none"></iframe>');
                iframe.appendTo(form);
                return form;
            };
        };
};
// 初始化$K.request对象
$K.request = new $K.Request();*/
