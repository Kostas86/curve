$(document).ready(function () {
    let curveUrl = $("[data-js-curve]").attr("data-js-curve");
    let valueBar = $(".curve-content-vertical");
    let dataBar = $(".curve-content-horizontal");
    let titleBar = $(".curve-content-top");
    let curveWrap = $(".curve-content-wrap");


    $.getJSON(curveUrl, function (data) {
        initStart(data);
    });
    function initStart(content) {
        console.log(content);
        contentOut(titleBar, content.name);
        let valueMax = 0;
        let valueMin = +content.content[0].value;

        let dataMax = 0;
        let dataMin = convertDate(content.content[0].date);
        
        for (i = 0; i <= content.content.length - 1; i++) {
            if (valueMax < +content.content[i].value) {
                valueMax = +content.content[i].value;
            };
            if (valueMin > +content.content[i].value) {
                valueMin = +content.content[i].value;
            };
            if (dataMax < convertDate("day", content.content[i].date)) {
                dataMax = convertDate("day", content.content[i].date);
            };
            if (dataMin > convertDate("day", content.content[i].date)) {
                dataMin = convertDate("day", content.content[i].date);
            };
        }
        let rangeValue = valueMax - valueMin;
        let rangeValueStep = (rangeValue - 2) / 8;
        let tempValue = valueMax;
        contentOut(valueBar, valueMax);
        for(i = 0;i <= 7;i++){
            tempValue -= rangeValueStep;
            contentOut(valueBar, Math.round(tempValue));   
        };
        
        contentOut(valueBar, valueMin);
        
        contentOut(dataBar, dataMin);
        contentOut(dataBar, dataMax);
    }
    function contentOut(place, item) {
        let htmlContent = '<p>' + item + '</p>';
        place.append(htmlContent);
    };
    function convertDate(convertType, string) {
        let stringReturn = "";
        if (convertType === "day") {
            stringReturn = string[0] + string[1];
        } else if (convertType === "month") {
            stringReturn = string[3] + string[4];
        } else if (convertType === "year") {
            stringReturn = string[6] + string[7] + string[8] + string[9];
        } else if (convertType === "all") {
            stringReturn = string[6] + string[7] + string[8] + string[9] + string[3] + string[4] + string[0] + string[1];
        } else {
            console.log("type error!");
        }
        return +stringReturn;
    };
    function fTest(item) {
        console.log(item);
    }

});