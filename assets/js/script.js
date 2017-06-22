$(function () {

    reset();

    // Listener to the buttons
    $(".calc__btn").click(function () {
        switch ($(this).val()) {
            case "CL":
                reset();
                break;
            case "=":
                calculate();
                break;
            default:
                setCalcVal($(this).val());
        }
    });

    // Resets the value back to 0
    function reset() {
        $(".calc__input").html(0);
        $(".calc__query").html(0);
    }

    // 
    function setCalcVal(newVal) {
        let curVal = $(".calc__input").html();
        let curQuery = $(".calc__query").html();
        console.log(curVal);
        
        if (/\d/g.test(newVal)) {
            // If the current operation is division, don't allow 0 to be pressed
            if (/\%$/g.test(curVal) && newVal == "0") return false;
            let val = curVal == 0 ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(val);
            $(".calc__query").html(val);
        } else {
            // It's a symbol, so we need to calculate OR add it to the query
            if (/\D/g.test(curVal)) {
                let numbers = curVal.split(/[+|\-|*|%]/g);
                // Replaces the operation if there's already an active operation
                if (!(numbers[1])) {
                    $(".calc__input").html(curVal.replace(/[+|\-|*|%]/g, newVal));
                    return false;
                }
                // If there's one query in order, calculate it and add the following symbol
                calculate();
                curVal = $(".calc__input").html();
            }
            $(".calc__input").html(curVal + "" + newVal);
        }
        curVal = $(".calc__input").html();
        $(".calc__query").html(curVal);
    }

    // Reads the current query and shows the result
    function calculate() {
        let query = $(".calc__input").html();
        let numbers = query.split(/[+|\-|*|%]/g);
        if (!(numbers[1])) {
            $(".calc__input").html(query.match(/[^+|\-|*|%]/g).join(""));
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
            case '%':
                result = numbers[1] != 0 ? numbers[0] / numbers[1] : 0;
                break;
        }
        $(".calc__input").html(result);
        let curQuery = $(".calc__query").html();
        $(".calc__query").html(curQuery+"="+result);
    }

});