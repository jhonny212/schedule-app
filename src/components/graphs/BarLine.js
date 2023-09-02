function createTemplateBar(horizontal,group_type,type, xAxis,yAxis) {
    const data1 = {
        type: "category",
        data: xAxis
    }
    const data2 = {
        type: "value"
    }

    const options = {
        grid: { top: 20, right: 40, bottom: 20, left: 40 },
        series: yAxis,
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
        },
    }
    if(horizontal) {
        options.xAxis = data2
        options.yAxis = data1
    }else{
        options.xAxis = data1
        options.yAxis = data2
    }

    return options
}

export {createTemplateBar}