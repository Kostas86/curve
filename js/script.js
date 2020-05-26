$(document).ready(function(){
    let curveUrl = $("[data-js-curve]").attr("data-js-curve");
    let valueBar = $(".curve-content-vertical");
    let dataBar = $(".curve-content-horizontal");
    let titleBar = $(".curve-content-top");
    let curveWrap = $(".curve-content-wrap");


    $.getJSON(curveUrl, function(data) {
        initStart(data);
    });
    function initStart(content){
        let curveName = content.name;
        let curveNameContent = '<p>' + curveName + '</p>';
        titleBar.append(curveNameContent);
        fTest(curveName);
        console.log(content);

        let curveDataType = content.dataType;
        let curveDataTypeContent = '<p>' + curveDataType + '<p>';
        dataBar.append(curveDataTypeContent);
        fTest(curveDataType);
        console.log(content);
    }
    function fTest(item){
        console.log(item);
    }

});