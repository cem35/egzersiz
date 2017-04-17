$(document).ready(function () {

    /*	SOME SETTINGS 	*/
    var gk = 33;

    /*	SOME SETTINGS End	*/

    /*	Variables	*/
    var mC   = $('#mainContainer'),
        fC   = $('#fakeContainer'),
        d    = $(document),
        w    = $(window),
        b    = $('body'),
        els  = $('#mainContainer li'),
        po   = $('#point'),
        fd   = $('#fd'),
        fnd  = $('#fd div'),
        cnt  = $('#content'),
        rn   = $('input[type="range"]'),
        SF   = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ? true : false),
        acSc = 6;

    if(typeof InstallTrigger !== 'undefined') b.addClass('FF');	//	is Firefox?

    var Coor = function () {
        this.x = 0;
        this.y = 0
    };

    /*
     I gave up for finding values from matrix3d
     (see rotate3d calculation: https://mdn.mozillademos.org/files/3552/transform-functions-rotate3d_hom4.png)
     so I'm storing some values in arrays as object (line 49)
     */
    var eTransform = function () {
        this.x = 0;
        this.y = 0;
        this.s = 0;
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
    };

    var sc,
        sh,
        trs = new Array();

    var cos = new Coor(),
        sin = new Coor(),
        r   = new Coor(),
        P   = new Coor(),
        p   = new Coor(),
        c   = new Coor(),
        f_l = new Coor();
    o = new Coor();

    for (i = 0; i < els.length; i++) {
        trs[i] = new eTransform();
    }

    if(SF) var mCsf = document.getElementById("mainContainer");

    var elmHoverIndex = NaN;
    var lvChild = '<section><div></div><div></div></section>';	//	For the Love of Love.
    /*	Variables End	*/

    ScreenVarsUpdate();


    /*	Events	*/


    w.resize(function (event) {
        ScreenVarsUpdate();
    }).keydown(function (e) {
        if(e.keyCode == 27) {
            ZoomOut();
        }
    });

    /*
     Yeah! I added a "quality" setting to fix blurry elements (3d transformed elements gets blurry if you scale them).
     This is a common bug for WebKit and Gecko. And, yes, Blink has this bug too, because it's still mostly WebKit.
     */

    rn.on('change', function () {
        var t = $(this);
        po.removeClass('zoom').find('.active').removeClass('active');
        mC.css({opacity : 0});
        cnt.removeAttr('class');

        switch (t.val()) {
            case "12":
                b.removeAttr('id');
                break;
            case "24":
                b.attr('id', 'hd');
                break;
            case "36":
                b.attr('id', 'uhd');
                break;
            default:
                b.removeAttr('id');
                break;
        }

        mC.on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {
            setTimeout(function () { w.trigger('resize'); }, 500);
            mC.off('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd');
        });
    });

    cnt.click(function (e) {
        e.stopPropagation();
    });

    els.mouseover(function (event) {
        var t = $(this);
        elmHoverIndex = $('li').index(this);
        t.addClass('transition-enabled');
        setTimeout(function () { ClassRemove(t, 'transition-enabled'); }, 200);

        o.x = (event.offsetX || event.clientX - $(event.target).offset().left);
        o.y = (event.offsetY || event.clientY - $(event.target).offset().top);

        ChildControl(t, o);
    }).mouseout(function () {
        var t             = $(this),
            elmHoverIndex = NaN;
        t.addClass('transition-enabled');
        setTimeout(function () { ClassRemove(t, 'transition-enabled'); }, 200);
    }).mousemove(function (event) {
        o.x = (event.offsetX || event.clientX - $(event.target).offset().left);
        o.y = (event.offsetY || event.clientY - $(event.target).offset().top);
    }).click(function (e) {
        e.stopPropagation();
        var t = $(this);

        if(!t.hasClass('active')) els.removeClass('active').find('header').removeClass('hidden');

        var i = $('li').index(this);
        for (j = 0; j < els.length; j++) {
            if(j == i) {
                ElementScale(els.eq(j), true, j);
            } else {
                ElementScale(els.eq(j), false, j);
            }
        }
        var xKay, yKay;
        xKay = mC.width() / 2 - parseInt(t.css('margin-left')) - trs[i].tx - t.width() / 2;
        yKay = mC.height() / 2 - parseInt(t.css('margin-top')) - trs[i].ty - t.height() / 2;
        if(!t.hasClass('active')) {
            els.addClass('transition-enabled-slow');
            mC.addClass('transition-enabled-slow');
            mC.removeAttr('style');
            mC.css({
                'transform' : 'scale(' + acSc + ') rotateY(' + -trs[i].ry + 'deg) rotateX(' + -trs[i].rx + 'deg) translate3d(' + xKay + 'px, ' + yKay + 'px, 0px)'
            });
            po.addClass('zoom');
            t.addClass('active');
            cnt.removeAttr('style').removeClass('show').find('header').html("").addClass('hidden');
            cnt.find('article').html("");
            var parentThis = t;	//	Just in case

            t.find('header').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {

                if(t.hasClass('active')) {
                    var _this = $(this);
                    var t_h = (_this.data('before') != '' ? '<small>' + _this.data('before') + '</small> ' : '');
                    t_h = t_h + _this.text();
                    t_h = t_h + (_this.data('after') != '' ? ' <small>' + _this.data('after') + '</small>' : '');
                    var t_c = parentThis.find('article').html();

                    /*

                     So, this "solution" is for browser's ridiculous 3d rotation + scale render bug (yeah, WebKit and Gecko).
                     If I apply 3d rotation to parent and child, all the childs gets blurry when parent or any child element scaled to >1.
                     I've tried so many (many) thing and I can't remember all of them. There are bug reports to Chromium for this bug,
                     but nobody cares.

                     */

                    var timeoutms = 100;

                    if(t.attr('id') == 'wh') {
                        timeoutms = 345;
                        if(b.attr('id') == 'hd') timeoutms = 456;
                        if(b.attr('id') == 'uhd') timeoutms = 567;
                    }

                    setTimeout(function () {
                        if(t.hasClass('active')) {
                            var tlrb = parentThis.get(0).getBoundingClientRect();
                            if(isMobile) {
                                cnt.css({
                                    top : tlrb.top + 45,
                                    left : tlrb.left + 65,
                                    right : w.width() - tlrb.width - tlrb.left + 70,
                                    bottom : w.height() - tlrb.height - tlrb.top + 40
                                });
                            } else {
                                cnt.css({
                                    top : tlrb.top + 55,
                                    left : tlrb.left + 65,
                                    right : w.width() - tlrb.width - tlrb.left + 80,
                                    bottom : w.height() - tlrb.height - tlrb.top + 60
                                })
                            }
                            cnt.addClass('show').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {
                                t.find('header').addClass('hidden');
                                cnt.find('header').removeClass('hidden');


                                $(this).off('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd');
                            });

                            cnt.find('header').html(t_h);
                            cnt.find('article').html(t_c);
                        }

                    }, timeoutms);

                    t.find('header').off('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd');
                }
            });
            setTimeout(function () { ClassRemove(t, 'transition-enabled-slow'); }, 567);
            setTimeout(function () { ClassRemove(els, 'transition-enabled-slow'); }, 567);
        }
    });

    d.mousemove(function (e) {
        console.log(e.pageX);
        if(!po.hasClass('zoom')) {
            c.x = e.pageX;
            c.y = e.pageY;
            r.x = (c.x - p.x) / p.x;
            r.y = (c.y - p.y) / p.y;
            cos.x = Math.cos((r.x / 2) * Math.PI);
            sin.x = Math.sin(r.x * Math.PI);
            cos.y = Math.cos((r.y / 2) * Math.PI);
            sin.y = Math.sin(r.y * Math.PI);
            sh = Math.sqrt(cos.x * cos.y);
            sc = Math.clamp(sh, 0.85, 1.1);
            /* 	I don't want to use real world physics (inverse-square law). It's not what I want. */

            if(SF) {
                /*	Well, what? Interesting WebKit repaint bug on Safari 	*/
                mCsf.style.display = 'none';
                mCsf.offsetHeight;
                mCsf.style.display = 'block';
                /*	Well, what? Interesting WebKit repaint bug on Safari 	*/
                //	I'll definitely find a cost-less solution.
            }

            mC.css({
                'transform' : 'scale(' + sc + ') translate3d(' + sin.x * 7.42 + 'em,' + sin.y * 7.42 + 'em,0em) rotateX(' + sin.y * -15 + 'deg) rotateY(' + sin.x * 15 + 'deg)',
                'box-shadow' : -sin.x * 7.42 + 'em ' + sin.y * -7.42 + 'em ' + gk * sh / 12 + 'em rgba(145,145,145,' + 0.15 * sh + ')'
            });

            for (i = 0; i < els.length; i++) {
                ElementRotate(els.eq(i), 1, false, i);
            }
        }
    }).mouseout(function () {
        if(!po.hasClass('zoom')) mC.addClass('transition-enabled');
        elmHoverIndex = NaN;
    }).mouseover(function () {
        if(!po.hasClass('zoom')) {
            mC.addClass('transition-enabled');
            setTimeout(function () { ClassRemove(mC, 'transition-enabled'); }, 200);
        }
    }).click(function (event) {
        ZoomOut();
    });

    mC.mousemove(function (e) {
        if(!po.hasClass('zoom')) {
            e.stopPropagation();
            c.x = e.pageX;
            c.y = e.pageY;
            r.x = (c.x - p.x) / p.x;
            r.y = (c.y - p.y) / p.y;
            cos.x = Math.cos((r.x / 2) * Math.PI) * 1.15;
            sin.x = Math.sin(r.x * Math.PI) * 1.15;
            cos.y = Math.cos((r.y / 2) * Math.PI) * 1.15;
            sin.y = Math.sin(r.y * Math.PI) * 1.15;
            sh = Math.sqrt(cos.x * cos.y);
            sc = Math.clamp(sh, 0.85, 1.1);

            if(SF) {
                /*	Well, what? Interesting WebKit repaint bug on Safari 	*/
                mCsf.style.display = 'none';
                mCsf.offsetHeight;
                mCsf.style.display = 'block';
                /*	Well, what? Interesting WebKit repaint bug on Safari 	*/
                //	I'll definitely find a cost-less solution. Or Apple'll fix this.
            }

            mC.css({
                'transform' : 'scale(' + sc + ') translate3d(' + sin.x * 7.42 + 'em,' + sin.y * 7.42 + 'em,0em) rotateX(' + sin.y * -15 + 'deg) rotateY(' + sin.x * 15 + 'deg)',
                'box-shadow' : -sin.x * 7.42 + 'em ' + sin.y * -7.42 + 'em ' + gk * sh / 12 + 'em rgba(145,145,145,' + 0.2 * sh + ')'
            });

            for (i = 0; i < els.length; i++) {
                if(els.eq(i).filter(':hover').length == 1) {
                    ElementRotate(els.eq(i), 1, true, i);
                } else {
                    ElementRotate(els.eq(i), 1.2, false, i);
                }
            }
        }

    }).mouseover(function (event) {
        if(!po.hasClass('zoom')) {
            $(this).addClass('transition-enabled');
            setTimeout(function () { ClassRemove(mC, 'transition-enabled'); }, 200);
        }
    }).mouseout(function (event) {
        elmHoverIndex = NaN;
        if(!po.hasClass('zoom')) {
            $(this).addClass('transition-enabled');
            setTimeout(function () { ClassRemove(mC, 'transition-enabled'); }, 200);
        }
    }).on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {
        $(this).removeClass('transition-enabled-slow');
    });

    var f_deg = 0;

    fd.mousemove(function (event) {
        var _temp = f_l.x - event.pageX, fc = 1;
        if(_temp != 0) f_deg = (_temp > 0 ? 45 : 135);
        if(po.hasClass('zoom')) fc = 7;	//	factor for zoomed Find's magnifying glass.

        fnd.css({
            'left' : ((event.pageX - ($(this).offset().left + fnd.width() / 2)) * parseInt(b.css('font-size')) / 12) / fc,
            'top' : ((event.pageY - ($(this).offset().top + fnd.height() / 2)) * parseInt(b.css('font-size')) / 12) / fc,
            'transform' : 'rotate(' + f_deg + 'deg)'
        });
        f_l.x = event.pageX;
        f_l.y = event.pageY;
    });

    /*	Events End	*/


    /*	Functions	*/

    function ScreenVarsUpdate() {
        P.x = w.width();
        P.y = w.height();
        p.x = P.x / 2;
        p.y = P.y / 2;
        sh = 0;
        sc = 0;
        mC.addClass('transition-enabled');
        mC.removeAttr('style');
        po.removeClass('zoom').find('.active').removeClass('active');
        b.removeAttr('style');
        fC.css({'transform' : 'scale(' + 12 / parseInt(b.css('font-size')) + ')'});
        $('header.hidden').removeClass('hidden');
        cnt.removeAttr('style').removeClass('show').find('header').html("").addClass('hidden');
        cnt.find('article').html("");
        setTimeout(function () {
            ClassRemove(mC, 'transition-enabled');
            ClassRemove(mC, 'transition-enabled-slow');
            ClassRemove($('header.hidden'), 'hidden');
        }, 200);

        if(isMobile) {
            if(P.x > P.y)
                acSc = 5;
            else
                acSc = 3.9;
        }
    }

    function ClassRemove(el, cl) {
        el.removeClass(cl);
    }

    function ElementRotate(elm, n, s, i) {
        var _bcr = elm.children('i').offset(),
            _x   = _bcr.left,
            _y   = _bcr.top;

        var _r   = new Coor(),
            _cos = new Coor(),
            _sin = new Coor();

        _r.x = (c.x > _x ? (c.x - _x) / (P.x - _x) : (c.x - _x) / (_x));
        _r.y = (c.y > _y ? (c.y - _y) / (P.y - _y) : (c.y - _y) / (_y));
        _sin.x = Math.sin(_r.x * Math.PI) * n;
        _sin.y = Math.sin(_r.y * Math.PI) * n;

        trs[i].tx = _sin.x * 31;
        trs[i].ty = _sin.y * 31;
        trs[i].rx = _sin.y * -18;
        trs[i].ry = _sin.x * 18;

        if(s) {
            elm.css({
                'transform' : 'scale(1.1) translate3d(' + trs[i].tx / 12 + 'em,' + trs[i].ty / 12 + 'em, 2em) rotateX(' + trs[i].rx + 'deg) rotateY(' + trs[i].ry + 'deg)'
            });
            trs[i].s = 1.1;
            trs[i].tz = 23;
        } else {
            trs[i].tz = Math.abs(_sin.y * 18);
            elm.css({
                'transform' : 'translate3d(' + trs[i].tx / 12 + 'em,' + trs[i].ty / 12 + 'em,' + trs[i].tz / 12 + 'em) rotateX(' + trs[i].rx + 'deg) rotateY(' + trs[i].ry + 'deg)'
            });
            trs[i].s = 1;
        }

    }

    function ElementScale(elm, s, i) {
        if(s) {
            elm.css({
                'transform' : 'scale(1.1) translate3d(' + trs[i].tx / 12 + 'em,' + trs[i].ty / 12 + 'em, 1.67em) rotateX(' + trs[i].rx + 'deg) rotateY(' + trs[i].ry + 'deg)'
            });
            trs[i].s = 1.1;
            trs[i].tz = 20;
        } else {
            elm.css({
                'transform' : 'translate3d(' + trs[i].tx / 12 + 'em,' + trs[i].ty / 12 + 'em,' + trs[i].tz / 12 + 'em) rotateX(' + trs[i].rx + 'deg) rotateY(' + trs[i].ry + 'deg)'
            });
            trs[i].s = 1;
        }
    }

    function ChildControl(t, o) {
        var id = t.attr('id');

        switch (id) {
            case 'lv':
                if(!t.hasClass('hover') && !t.hasClass('active')) {
                    t.addClass('hover').append(lvChild);
                    $('#lv section:not(.content)').css({'top' : o.y + 'px', 'left' : o.x + 'px'});
                    setTimeout(function () { ChildRemove(t); }, 2222);
                }
                break;
        }
    }

    function ChildRemove(t) {
        t.removeClass('hover').children('section:not(.content)').remove();
        CheckHover();
    }

    function CheckHover() {
        if(elmHoverIndex != NaN) {
            ChildControl(els.eq(elmHoverIndex), o);
        }
    }

    function ZoomOut() {
        if(els.hasClass('active')) {
            els.addClass('transition-enabled-slow');
            mC.addClass('transition-enabled-slow');
            mC.removeAttr('style');
            po.removeClass('zoom');
            els.removeClass('active');
            $('header.hidden').removeClass('hidden');
            cnt.removeAttr('style').removeClass('show').find('header').html("").addClass('hidden');
            cnt.find('article').html("");
            setTimeout(function () { ClassRemove(els, 'transition-enabled-slow'); }, 567);
            setTimeout(function () { ClassRemove(mC, 'transition-enabled-slow'); }, 678);
        }
    }

    var isMobile = (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0);
    if(isMobile) {
        if(P.x > P.y)
            acSc = 5;
        else
            acSc = 3.9;
    }

    /*
     I need to warn you, this page is still in development because of some bugs (some of them because of the browsers) and performance problems.
     */

    if(isMobile) {
        var warningTime = 4567;
        $('#warning').css('font-size', '2.5em');
        b.addClass('mobile');
    } else {
        var warningTime = 6543;
    }

    setTimeout(function () {
        $('#warning').fadeOut();
    }, warningTime);

    /*	Functions End	*/


    /*  Gyro Functions for Mobile   */

    function orientation(event) {
        //console.log(gyro2Coor(event));
        var data = {type : "mousemove", pageX : gyro2Coor(event).pageX, pageY : gyro2Coor(event).pageY};

        d.trigger(data);
    }

    var InitGyro = {};

    function gyro2Coor(event) {
        if(InitGyro.gamma == undefined) InitGyro = event;

        var gamma = InitGyro.gamma - event.gamma,    //  Horizontal
            beta  = InitGyro.beta - event.beta,     //  Vertical
            coor  = {pageX : 0, pageY : 0};

        gamma = Math.clamp(gamma, -40, 40) + 40;
        beta = Math.clamp(beta, -40, 40) + 40;

        gamma = P.x * gamma / 80;
        beta = P.y * beta / 80;

        coor.pageX = parseInt(gamma);
        coor.pageY = parseInt(beta);

        return coor;
    }

    if(window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", orientation, false);
    } else {
        console.log("DeviceOrientationEvent is not supported");
    }

    /*  Gyro Functions for Mobile End   */
});

$(window).load(function () {
    setTimeout(function () { $('body').removeClass('noTransition'); }, 100);	//	I still need this process to fix initial transitions.
});

//	I'm so used to use Math.Clamp in Unity, so I need this! -_-
(function () {Math.clamp = function (a, b, c) {return Math.max(b, Math.min(c, a));}})();