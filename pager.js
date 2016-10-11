/**
 * 分页组件，依赖jQuery
 *
 * @version 1.0
 * @author liuchun on 2016/10/10
 * @example:
 *
 */
(function(factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(factory);
    } else {
        // no AMD; invoke directly
        factory();
    }
}(
    function(){

        function Pager(selector, config) {
            var $pagerBox = $(selector);
            var defaultConfig = {
                wrapperClass:'pagination',
                curPage: 1, //当前第几页
                pageSize: 10, //每页多少条
                totalSize:0, //共多少条数据
                offset: 5, //前后显示多少页
                stopPropagation:true,
                pageCallBack:function (page) {} //跳转执行
            };
            var _config = $.extend(defaultConfig, config);
            _config.totalPage = Math.ceil(_config.totalSize / _config.pageSize);

            var numList;

            var genNumList = function () {
                numList = [];
                var begin = _config.curPage - _config.offset;
                begin = begin < 1 ? 1 : begin;

                var end = _config.curPage + _config.offset;
                end = end > _config.totalPage ? _config.totalPage : end;

                for(var i = begin; i<= end;i++){
                    numList.push(i);
                }
            };

            var _genTpl = function () {

                var tpl = '<ul>';
                if(_config.totalPage>1){

                    if(_config.curPage > 1){
                        tpl += '<li><a class="pagebar-step" href="#" data-go="1">首页</a></li>';
                        tpl += '<li><a class="pagebar-step" href="#" data-go="'+(_config.curPage-1)+'">上一页</a></li>';
                    }
                    if(numList && numList.length > 0){
                        if(numList[0]>1){
                            tpl += '<li><span class="pagebar-ellipsis">…</span></li>';
                        }
                        $.map(numList,function (num) {
                            if(num == _config.curPage){
                                tpl += '<li><span class="pagebar-step pagebar-cur">'+num+'</span></li>';
                            }else{
                                tpl += '<li><a class="pagebar-step" href="#" data-go="'+num+'">'+num+'</a></li>';
                            }
                        });
                        if(numList[numList.length-1]<_config.totalPage){
                            tpl += '<li><span class="pagebar-ellipsis">…</span></li>';
                        }
                    }

                    if(_config.curPage < _config.totalPage){
                        tpl += '<li><a class="pagebar-step" href="#" data-go="'+(_config.curPage+1)+'">下一页</a></li>';
                        tpl += '<li><a class="pagebar-step" href="#" data-go="'+_config.totalPage+'">末页</a></li>';
                    }

                }

                tpl += '<li><span class="pagebar-step">第'+_config.curPage+'/'+_config.totalPage+'页</span></li>';
                tpl += '<li><span class="pagebar-step">共'+_config.totalSize+'条</span></li>';
                tpl += '</ul>';
                return tpl;
            };

            var $wrapper = $('<div></div>').addClass(_config.wrapperClass);

            var render = function () {
                genNumList();
                $wrapper.html(_genTpl());
                $pagerBox.html($wrapper);
            };

            var bind = function () {
                $wrapper.off('click');
                $wrapper.on('click', '[data-go]', function (ev) {
                    ev.preventDefault();
                    if (_config.stopPropagation) ev.stopPropagation();
                    var page = $(ev.currentTarget).data('go');
                    if ($.isFunction(_config.pageCallBack)) {
                        _config.pageCallBack(page);
                    }
                });
            };

            var init = function () {
                render();
                bind();
            };

            init();

        }
        window.Pager = Pager;
        return Pager;
    }
));
