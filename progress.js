Component({
    properties: {
        percent: {
            type: [Number, String],
            value: 0
        },
        width: {
            type: [Number, String],
            value: 750
            // 宽度
        },
        strokeWidth: {
            type: [Number, String],
            value: 20
            // 进度条高度
        },
        activeColor: {
            type: String,
            value: '#949494'
            // 进度条颜色,有渐变需求时,传渐变的起始值和结束值,并用逗号分隔
        },
        backgroundColor: {
            type: String,
            value: '#EBEBEB'
            // 进度条背景颜色
        },
        showPoint: {
            type: Boolean,
            value: true
            // 是否展示进度条头部point
        },
        pointLandscapeBgColor: {
            type: String,
            value: ''
            // point渐变色起点值
        },
        pointPortraitBgColor: {
            type: String,
            value: ''
            // point渐变色结束值
        },
        pointValue: {
            type: String,
            value: ''
            // point内显示文字，限一个文字
        },
        radius: {
            type: [Number, String],
            value: 10
            // 进度条圆角
        },
        orientation: {
            type: [Number, String],
            value: 'landscape'
            // landscape: 横向, portrait: 纵向
        },
        portraitOrientation: {
            type: [Number, String],
            value: 'bottom'
            // top: 从上到下, bottom: 从下到上
        }
    },
    // lifetimes: {
    //     attached: function() {
    //       // 在组件实例进入页面节点树时执行
    //       updateAttr()
    //     },
    //     detached: function() {
    //       // 在组件实例被从页面节点树移除时执行
    //     },
    // },
    observers: {
        'percent': function (num) {
            const percent = num;
            const orientation = this.data.orientation;
            const width = this.data.width;
            const strokeWidth = this.data.strokeWidth;
            const activeColor = this.data.activeColor;
            const portraitOrientation = this.data.portraitOrientation;
            this.setData({
                lineWidth: orientation == 'landscape' ? percent / 100 * width : strokeWidth,
                lineHeight: orientation == 'landscape' ? strokeWidth : percent / 100 * width,
                lineTop: portraitOrientation == 'bottom' && orientation == 'portrait' ? (100 - percent) / 100 * width : 0,
                pointWidth: strokeWidth / 0.416666,
                pointHeight: strokeWidth / 0.416666,
                pointRight: orientation == 'landscape' ? 0 : -(strokeWidth / 0.416666) / 4,
                pointLeft: orientation == 'landscape' ? percent / 100 * width - this.data.pointWidth / 2 : strokeWidth - this.data.pointWidth / 2,
                pointTop: orientation == 'landscape' ? -(strokeWidth / 0.416666) / 3 + 'rpx' : '',
                pointBottom: portraitOrientation == 'top' && orientation == 'portrait' && 0
            })
        }
    },
    attached: function () {
        // updateAttr: function () {
        const orientation = this.data.orientation;
        const width = this.data.width;
        const percent = this.data.percent;
        const strokeWidth = this.data.strokeWidth;
        const activeColor = this.data.activeColor;
        const linearBegen = this.data.linearBegen;
        const linearEnd = this.data.linearEnd;
        const portraitOrientation = this.data.portraitOrientation;
        console.log("percent==", percent)
        const pointLandscapeBgColor = 'linear-gradient(90deg,' + activeColor.split(',')[0] + ' 0%,' + activeColor.split(',')[1] + ' 100%)';
        const pointPortraitBgColor = 'linear-gradient(180deg,' + activeColor.split(',')[0] + ' 0%,' + activeColor.split(',')[1] + ' 100%)';
        if (!!~activeColor.indexOf(',')) {
            this.setData({
                lineWidth: orientation == 'landscape' ? percent / 100 * width : strokeWidth,
                lineHeight: orientation == 'landscape' ? strokeWidth : percent / 100 * width,
                lineTop: portraitOrientation == 'bottom' && orientation == 'portrait' ? (100 - percent) / 100 * width : 0,
                setBackground: orientation == 'landscape' ? (activeColor.split(',')[1] ? 'background-image: linear-gradient(to right, ' + activeColor.split(',')[0] + ', ' + activeColor.split(',')[1] + ');' : 'background-color:' + activeColor + ';') : (activeColor.split(',')[1] ? 'background-image: linear-gradient(to top, ' + activeColor.split(',')[0] + ', ' + activeColor.split(',')[1] + ');' : 'background-color:' + activeColor + ';'),
                pointWidth: strokeWidth / 0.416666,
                pointHeight: strokeWidth / 0.416666,
                pointLeft:0,
                pointRight: orientation == 'landscape' ? 0 : -(strokeWidth / 0.416666) / 4,
                pointTop: orientation == 'landscape' ? -(strokeWidth / 0.416666) / 4 + 'rpx' : '',
                pointBottom: portraitOrientation == 'top' && orientation == 'portrait' && 0,
                setPointBackground: orientation == 'landscape' ? pointLandscapeBgColor : pointPortraitBgColor,
                pointLandscapeBgColor: pointLandscapeBgColor,
                pointPortraitBgColor: pointPortraitBgColor,
                //activeLineColor: activeColor.split(','),
            })
        }
    }
})