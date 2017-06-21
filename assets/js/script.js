$(function() {

    var calcVal = 0;

    setCalcVal();

    $(".calc__btn").click(function() {
        switch ($(this).val()) {
            case "+":
            case "-":
            case "x":
            case "%":
            case "=":
            case "CL":
                setCalcVal(0);
                break;
            default:
                setCalcVal($(this).val());

        }
    });

    function setCalcVal(newVal = 0) {
        calcVal = newVal;
        $(".calc__input").val(newVal);
    }

});