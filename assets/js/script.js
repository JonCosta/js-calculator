$(function () {

    reset();
    // calculate();


    $(".calc__btn").click(function () {
        switch ($(this).val()) {
            case "CL":
                reset();
                break;
            case "=":
                calculate();
                break;
            case "+":
            case "-":
            case "x":
            case "%":
            default:
                setCalcVal($(this).val());

        }
    });

    function reset() {
        $(".calc__input").val(0);
    }

    function setCalcVal(newVal) {
        let curVal = $(".calc__input").val();
        console.log(curVal);
        if (/\d/g.test(newVal)) {
            $(".calc__input").val(curVal == 0 ? +newVal : curVal + "" + newVal);
        } else {
            // It's a symbol, so we need to calculate OR add it to the query
            if (/\D/g.test(curVal)) {
                calculate();
                curVal = $(".calc__input").val();
            }
            $(".calc__input").val(curVal + "" + newVal);
        }
    }

    function calculate() {
        let query = $(".calc__input").val();
        let numbers = query.split(/[+|\-|*|%]/g);
        if (!(numbers[1])) {
            $(".calc__input").val(query.match(/\d/g).join(""));
            return false;
        }
        let operation = query.match(/[+|\-|*|%]/g)[0];
        numbers.forEach(function (item, index) {
            numbers[index] = parseFloat(item);
        });
        let result = 0;
        switch (operation) {
            case '+':
                result = numbers[0] + numbers[1];
                break;
            case '-':
                result = numbers[0] - numbers[1];
                break;
            case '*':
                result = numbers[0] * numbers[1];
                break;
            case '/':
                result = numbers[1] != 0 ? numbers[0] / numbers[1] : 0;
                break;
        }
        $(".calc__input").val(result);
    }

});