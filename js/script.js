$(document).ready(function () {
    let curveUrl = $("[data-js-curve]").attr("data-js-curve"); //записываем обект с кривой
    let valueBar = $(".curve-content-vertical");  //записываем область для значений
    let dataBar = $(".curve-content-horizontal");  //записываем область для дат
    let titleBar = $(".curve-content-top"); //записываем область для названий кривых
    let curveWrap = $(".curve-content-wrap"); //записываем область для точек графика


    $.getJSON(curveUrl, function (data) { //функция получения базы из JSON
        initStart(data); //запускаем скрипт по загрузке БД
    });
    function initStart(content) {//основная функция скрипта
        console.log(content);//вывод БД в консоль для просмотра содержимого
        contentOut(titleBar, content.name);//вывод названия кривой
        let valueMax = 0;//переменная с минимальным значением
        let valueMin = +content.content[0].value;//переменная с максимальным значением

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