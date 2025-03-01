
document.getElementById('startSegmentation').addEventListener('click', function () {
    // 获取选择的数据
    var selectedData = document.getElementById('dataSelect').value;
    var resultContainer = document.getElementById('result');

    // 显示分割结果
    if (selectedData) {
        resultContainer.innerHTML = '<p>正在分割 ' + selectedData + '...</p>';
        // 模拟分割过程
        setTimeout(function () {
            resultContainer.innerHTML = '<p>' + selectedData + ' 的分割操作已完成！</p>';

            // 在分割完成后，调用图像处理日志函数
            logImageProcessing();
        }, 2000); // 模拟2秒后完成分割
    } else {
        resultContainer.innerHTML = '<p>请选择一个数据集进行分割。</p>';
    }
});

function logImageProcessing() {
    const logOutput = document.getElementById('logOutput');

    // 模拟处理过程并将日志输出到页面
    setTimeout(function () {
        logOutput.innerHTML = `
                    <p>处理完成，用时3030毫秒</p>
                    <p>图片参数：</p>
                    <p>图像分辨率：(512,512)</p>
                    <p>左上角坐标：(107,219)</p>
                    <p>右下角坐标：(319,395)</p>
                    <p>中心坐标：(213.0,307.0)</p>
                    <p>区域宽度：212</p>
                    <p>区域高度：176</p>
                    <p>区域面积：23401.0</p>
                    <p>区域周长：693.647</p>
                    <p>左极点坐标：(107,305)</p>
                    <p>右极点坐标：(318,286)</p>
                    <p>上极点坐标：(268,219)</p>
                    <p>下极点坐标：(189,394)</p>
                `;
    }, 3030); // 模拟处理过程耗时3030毫秒
}
$(function () {

    echarts_1();
    echarts_2();
    // map();
    echarts_3();
    echarts_4();
    echarts_5();
    echarts_6();

    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_1'));

        var data = [
            { value: 75, name: '舒张左心室容积', itemStyle: { color: '#20b9cf' } },  // 舒张左心室容积
            { value: 25, name: '收缩左心室容积', itemStyle: { color: '#ff9f4b' } },  // 收缩左心室容积
        ];

        option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                trigger: 'item',
                formatter: "{b}: <br/>{c} ({d}%)"
            },
            legend: {
                x: '70%',
                y: 'center',
                orient: 'vertical',
                itemGap: 12,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'rect',
                data: ['舒张左心室容积', '收缩左心室容积'],
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                }
            },
            series: [
                {
                    name: '左心室容积',
                    type: 'pie',
                    clockwise: false, // 顺时针方向
                    center: ['35%', '50%'], // 饼图的中心（圆心）坐标
                    radius: [60, 80], // 外环半径
                    itemStyle: { // 图形样式
                        normal: {
                            borderColor: 'transparent',
                            borderWidth: 2,
                        },
                    },
                    label: { // 标签的位置
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: "{d}%",
                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: data
                },
                {
                    name: '',
                    type: 'pie',
                    clockwise: false,
                    silent: true,
                    center: ['35%', '50%'], // 饼图的中心坐标
                    radius: [0, 60], // 内环半径
                    itemStyle: { // 图形样式
                        normal: {
                            borderColor: '#1e2239',
                            borderWidth: 1.5,
                            opacity: 0.1,
                        }
                    },
                    label: { // 标签的位置
                        normal: {
                            show: false,
                        }
                    },
                    data: data
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_2'));

        var data = [
            { value: 72, name: '射血分数', itemStyle: { color: '#00b3ff' } },  // 射血分数（蓝色）
            { value: 28, name: '剩余容积', itemStyle: { color: '#333' } },  // 剩余容积（灰色）
        ];

        option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                trigger: 'item',
                formatter: "{b}: <br/>{c} ({d}%)"
            },
            legend: {
                x: '70%',
                y: 'center',
                orient: 'vertical',
                itemGap: 12,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'rect',
                data: ['射血分数', '剩余容积'],
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                }
            },
            series: [
                {
                    name: '射血分数',
                    type: 'pie',
                    clockwise: false, // 顺时针方向
                    center: ['35%', '50%'], // 饼图的中心（圆心）坐标
                    radius: [60, 80], // 外环半径
                    itemStyle: { // 图形样式
                        normal: {
                            borderColor: 'transparent',
                            borderWidth: 2,
                        },
                    },
                    label: { // 标签的位置
                        normal: {
                            show: true,
                            position: 'outside', // 标签放置在外面
                            formatter: "{d}%", // 显示百分比
                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 14,
                            }
                        }
                    },
                    labelLine: { // 标签与圆环之间的线
                        normal: {
                            show: true,
                            length: 20, // 标签线长度
                            lineStyle: {
                                color: '#fff', // 标签线颜色
                            }
                        }
                    },
                    data: data
                },
                {
                    name: '',
                    type: 'pie',
                    clockwise: false,
                    silent: true,
                    center: ['35%', '50%'], // 饼图的中心坐标
                    radius: [0, 60], // 内环半径
                    itemStyle: { // 图形样式
                        normal: {
                            borderColor: '#1e2239',
                            borderWidth: 1.5,
                            opacity: 0.1,
                        }
                    },
                    label: { // 标签的位置
                        normal: {
                            show: false,
                        }
                    },
                    data: data
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function echarts_3() {
        var canvas = document.createElement("canvas");
        var myChart = document.getElementById('echarts_3');
        myChart.appendChild(canvas); // 把canvas加到echarts_3容器中

        var ctx = canvas.getContext("2d");

        var width = canvas.width = myChart.clientWidth;
        var height = canvas.height = 200;

        // 初始偏移量
        var xOffset = 0;

        // 绘制心电图波形函数
        function drawECG(xOffset) {
            ctx.beginPath();
            ctx.moveTo(0 + xOffset, height / 2); // 从画布的左边开始

            // 绘制P波，增加波峰高度
            ctx.lineTo(50 + xOffset, height / 2 - 30);
            ctx.lineTo(100 + xOffset, height / 2);

            // 绘制QRS波群（快速尖峰），增加波峰高度
            ctx.lineTo(150 + xOffset, height / 2 - 80); // Q波
            ctx.lineTo(200 + xOffset, height / 2 + 100); // R波
            ctx.lineTo(250 + xOffset, height / 2 - 60); // S波

            // 中间部分设为0，拉长并让线变平
            ctx.lineTo(300 + xOffset, height / 2); // 连接点
            ctx.lineTo(600 + xOffset, height / 2); // 拉长0的部分（水平线）

            // 绘制T波（缓慢上升和下降），增加波峰高度
            ctx.lineTo(650 + xOffset, height / 2 + 60); // T波的上升
            ctx.lineTo(700 + xOffset, height / 2); // T波的下降

            ctx.strokeStyle = "#72b0f9"; // 蓝色曲线
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // 绘制坐标轴
        function drawAxes() {
            ctx.strokeStyle = "#ccc"; // 坐标轴颜色
            ctx.lineWidth = 1;

            // X轴
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();

            // Y轴
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            ctx.stroke();

            // 绘制坐标轴刻度
            ctx.font = "12px Arial";
            ctx.fillStyle = "#ccc";
            for (var i = 0; i < width; i += 100) {
                ctx.fillText(i, i, height / 2 + 15); // X轴刻度
            }

            for (var j = -100; j <= 100; j += 50) {
                ctx.fillText(j, 0, height / 2 - j); // Y轴刻度
            }
        }

        // 动态绘制心电图
        function draw() {
            ctx.clearRect(0, 0, width, height); // 清空画布

            // 绘制坐标轴
            drawAxes();

            // 绘制第一个心电图
            drawECG(xOffset);

            // 绘制第二个心电图（从第一个波形的末尾开始）
            drawECG(xOffset + 700);
            drawECG(xOffset + 1400);

            // 每次更新时，逐步移动xOffset，使心电图波形向左滚动
            xOffset -= 4;

            // 平滑循环：如果第一个波形完全移出画布，将其重新放置在第二个波形的末尾
            if (xOffset <= -700) {
                xOffset = 0;
            }

            // 继续动画
            requestAnimationFrame(draw);
        }

        // 启动动画
        draw();
    }


    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_4'));

        option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.name}: <br/> ${params.value[1]} - ${params.value[4]}`; // 显示箱线图的范围
                }
            },
            toolbox: {
                show: false,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5'], // x轴为各个系统
                axisLabel: {
                    rotate: 45, // 旋转x轴标签
                    fontSize: 14,
                    color: '#fff'  // 设置x轴标签为白色
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff' // 设置x轴线为白色
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '数值',
                axisLabel: {
                    formatter: '{value}', // y轴的单位
                    color: '#fff'  // 设置y轴标签为白色
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff' // 设置y轴线为白色
                    }
                }
            },
            series: [
                {
                    name: '箱线图',
                    type: 'boxplot',
                    data: [
                        [150, 200, 250, 300, 350], // 娱乐系统数据
                        [100, 150, 200, 220, 250], // 照明系统数据
                        [80, 100, 150, 180, 210],  // 空调系统数据
                        [200, 220, 250, 280, 320], // 动力系统数据
                        [40, 60, 90, 120, 150]     // 其他系统数据
                    ],
                    itemStyle: {
                        normal: {
                            color: '#ff8c00' // 设置箱线图颜色
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_5'));

        var xData = function () {
            var data = ['正常组', '轻度异常组', '重度异常组'];

            return data;
        }();

        var data = [23, 22, 20, 30, 22]

        option = {
            // backgroundColor: "#141f56",

            tooltip: {
                show: "true",
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.4)', // 背景
                padding: [8, 10], //内边距
                // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                formatter: function (params) {
                    if (params.seriesName != "") {
                        return params.name + ' ：  ' + params.value + ' 辆';
                    }
                },

            },
            grid: {
                borderWidth: 0,
                top: 20,
                bottom: 35,
                left: 40,
                right: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: [{
                type: 'category',

                axisTick: {
                    show: false
                },

                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    }
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                    // formatter:function(val){
                    //     return val.split("").join("\n")
                    // },
                },
                data: xData,
            }, {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: xData,
            }],
            yAxis: {
                min: 10,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                    formatter: '{value}',
                },
            },
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        show: true,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00c0e9'
                        }, {
                            offset: 1,
                            color: '#3b73cf'
                        }]),
                        barBorderRadius: 50,
                        borderWidth: 0,
                    },
                    emphasis: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(105,123, 214, 0.7)'
                    }
                },
                zlevel: 2,
                barWidth: '20%',
                data: data,
            },
            {
                name: '',
                type: 'bar',
                xAxisIndex: 1,
                zlevel: 1,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 0,
                        shadowBlur: {
                            shadowColor: 'rgba(255,255,255,0.31)',
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 2,
                        },
                    }
                },
                barWidth: '20%',
                data: [30, 30, 30, 30, 30]
            }
            ]
        }


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_6'));

        var data = {
            "chart": [{
                month: "I级",
                value: 75,
                size: 68
            },
            {
                month: " II级",
                value: 170,
                size: 88
            },
            {
                month: "II级",
                value: 320,
                size: 120
            },
            {
                month: "III级",
                value: 460,
                size: 140
            },
            {
                month: "III级",
                value: 516,
                size: 167
            },

            {
                month: "IV级",
                value: 600,
                size: 120
            }

            ]
        };

        var xAxisMonth = [],
            bubbleData = [];

        // 提取x轴和气泡图数据
        for (var i = 0; i < data.chart.length; i++) {
            xAxisMonth.push(data.chart[i].month);
            bubbleData.push([
                i,                // x轴数据（对应月份的索引）
                data.chart[i].value,  // y轴数据（value）
                data.chart[i].size   // 气泡的大小
            ]);
        }

        option = {
            title: '',
            grid: {
                top: '10%',
                left: '30',
                bottom: '0',
                right: '10',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.data.name + "<br/>" + '数值: ' + params.data[1] + '<br/>大小: ' + params.data[2];
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisMonth,
                axisLabel: {
                    color: '#b6b5ab'
                },
                axisLine: {
                    show: true,
                    color: "rgba(255, 255, 255, 0.63)"
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#b6b5ab'
                },
                axisLine: {
                    show: true,
                    color: "rgba(255, 255, 255, 0.62)"
                },
                axisTick: {
                    show: false
                }
            },
            color: ['#e54035'],
            series: [{
                name: '汽泡图',
                type: 'scatter',
                data: bubbleData,
                symbolSize: function (data) {
                    return data[2]; // 根据数据中的大小来调整气泡的大小
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                'rgba(250, 194, 65, 0.8)',
                                'rgba(239, 118, 88, 0.77)',
                                'rgba(239, 124, 132, 0.8)',
                                'rgba(124, 237, 160, 0.72)',
                                'rgba(215, 255, 149, 0.8)'
                            ];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


})

