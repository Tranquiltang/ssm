$K.advancePayment = $K.advancePayment || {};
$K.advancePayment.Controller = function(){

    $K.advancePayment.Controller.prototype.onStateRenderer=function(e){
        if (e.value == 0) return "停用";
        else return "<font color='red'>启用</font>";
    };

    $K.advancePayment.Controller.prototype.addExample = function(){

    };

    $K.advancePayment.Controller.prototype.delExample = function(){

    };

    $K.advancePayment.Controller.prototype.editExample = function(){

    };

    $K.advancePayment.Controller.prototype.queryForPage = function(){

    };

    /**
     * 初始化输入框
     */
    $K.advancePayment.Controller.prototype.initInputValue=function () {
        mini.get("iptMerchantNo").setValue("C100101022");
    }
    /**
     * 初始化绑定页面的按钮点击事件
     */
    var initEvent = function(){
        $K.advancePayment.Controller.prototype.initInputValue();
        mini.get("btnSynKey").on("click",function () {
            var merchantNo=mini.get("iptMerchantNo").getValue()
            console.log(merchantNo);
            $.ajax({
                url:"http://localhost:8080/user/key?merchantNo="+merchantNo, //请求的url地址
                //dataType:"json", //返回格式为json
                //async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                //data:merchantNo, //参数值
                type:"POST", //请求方式
                beforeSend:function(){
                    //请求前的处理
                },
                success:function(req){
                    //请求成功时处理
                    if(req=="true"){
                        mini.alert("秘钥同步<span style='color: green'>成功</span>");
                    }else{
                        mini.alert("秘钥同步<span style='color: red'>失败</span>");
                    }
                    /*mini.alert("11111");*/
                    /*window.location="http://localhost:8080/html/payment/advancePayment.html";*/
                },
                complete:function(){
                    //请求完成的处理
                },
                error:function(){
                    //请求出错处理
                    mini.alert("error");
                }
            });
            /*mini.alert("111");*/
        });

        mini.get("btnIncome").on("click",function () {
            $.ajax({
                url:"http://localhost:8080/user/test10004", //请求的url地址
                dataType:"json", //返回格式为json
                //async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                //data:{"id":"value"}, //参数值
                type:"POST", //请求方式
                beforeSend:function(){
                    //请求前的处理
                },
                success:function(req){
                    //请求成功时处理
                    mini.alert("<span style='color: green;margin-left: -90px;'>响应码:</span><span style='margin-left: 10px'>"+req.code+"</span><br><span style='color: green'>响应信息：</span>"+req.msg);
                    mini.get("iptBusino").setValue(req.busino);
                    /*mini.alert("11111");*/
                    /*window.location="http://localhost:8080/html/payment/advancePayment.html";*/
                },
                complete:function(){
                    //请求完成的处理
                },
                error:function(){
                    //请求出错处理
                    mini.alert("error");
                }
            });
            /*mini.alert("111");*/
        });

        mini.get("btnSearch").on("click",function () {
            var busino=mini.get("iptBusino").getValue();
            $.ajax({
                url:"http://localhost:8080/user/test10008?busino="+busino, //请求的url地址
                dataType:"json", //返回格式为json
                //async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                //data:{"id":"value"}, //参数值
                type:"POST", //请求方式
                beforeSend:function(){
                    //请求前的处理
                },
                success:function(req){
                    //请求成功时处理

                    mini.alert("查询成功，您查询的流水号"+busino+"的委托清分返回信息是：<br><span style='color: green;margin-left: -90px;'>响应码:</span><span style='margin-left: 10px'>"+req.cxjyjg+"</span><br><span style='color: green'>响应信息：</span>"+req.cxxyxx);
                    /*mini.alert("11111");*/
                    /*window.location="http://localhost:8080/html/payment/advancePayment.html";*/
                },
                complete:function(){
                    //请求完成的处理
                },
                error:function(){
                    //请求出错处理
                    mini.alert("error");
                }
            });
            /*mini.alert("111");*/
        });

        mini.get("btnPushCarInfo").on("click",function () {
            var arr=[
                {
                    "carName":"湘AE9852",
                    "mainDriverName":"李小海",
                    "driverPhone":"15698547541",
                    "carUseType":"17.5m车",
                    "carLength":"33.33",
                    "remark":"该司机谨慎小心，责任心很强。",
                    "carStatus":1,
                    "loadableWeight":0,
                    "loadableVolume":0,
                    "spareField1":"",
                    "spareField2":"",
                    "spareField3":"",
                    "spareField4":"",
                    "spareField5":"",
                    "spareField6":"",
                    "spareField7":"",
                    "spareField8":"",
                    "spareField9":"",
                    "spareField10":"111"
                }
            ];
            var arrJson=JSON.stringify(arr);
            console.log(arrJson);
            //var carInfoList;
            var ss="fsdf"
            $.ajax({
                url:"http://192.168.0.131:9090/sdjy/tms/postVehicleInfo", //请求的url地址
                dataType:"json", //返回格式为json
                //async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:{"carInfoList":arrJson}, //参数值
                type:"POST", //请求方式
                beforeSend:function(){
                    //请求前的处理
                },
                success:function(req){
                    if(req.code=="000000"){
                        mini.alert(req.message);
                    }
                    //请求成功时处理
                    /*mini.alert("11111");*/
                    /*window.location="http://localhost:8080/html/payment/advancePayment.html";*/
                },
                complete:function(){
                    //请求完成的处理
                },
                error:function(){
                    //请求出错处理
                    mini.alert("error");
                }
            });
            /*mini.alert("111");*/
        });
    };


    var init = function(){
        mini.parse();
        initEvent();
    };

    init();
};

// Java里面的New， 也是js对象的实例化
$K.advancePayment.contoller = new $K.advancePayment.Controller();

