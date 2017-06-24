$(function () {

    reset();

    // Listener to the buttons
    $(".calc__btn").click(function () {
        switch ($(this).val()) {
            case "CL":
                reset();
                break;
            case "=":
                calculate($(".calc__query").html());
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
        let curVal = /=/g.test($(".calc__query").html()) ? '' : $(".calc__input").html();
        let curQuery = /=/g.test($(".calc__query").html()) ? '' : $(".calc__query").html();

        if (/\d/g.test(newVal)) {
            // If the current operation is division, don't allow 0 to be pressed
            if (/\%$/g.test(curQuery) && newVal == "0") return false;
            let val = curVal == 0 ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(/\D/g.test(curVal) ? newVal : val);
            $(".calc__query").html(curQuery == 0 ? +newVal : curQuery + "" + newVal);
        } else {
            // It's a symbol, so we need to calculate OR add it to the query
            if (/\D/g.test(curQuery)) {
                let numbers = curQuery.split(/[+|\-|x|%]/g);
                // Replaces the operation if there's already an active operation
                if (!(numbers[1])) {
                    $(".calc__query").html(curQuery.replace(/[+|\-|x|%]/g, newVal));
                    return false;
                }
                // If there's one query in order, calculate it and add the following symbol
                curQuery = $(".calc__query").html();
                calculate(curQuery);
            }
            $(".calc__input").html(newVal);
            $(".calc__query").html(curQuery + "" + newVal);
        }
    }

    // Reads the current query and shows the result
    function calculate(query) {
        // let query = $(".calc__query").html();

        let entries = query.split("");
        let result = 0;
        while (entries.length > 0) {
            if (result == 0) {
                result = parseFloat(entries.shift());
            }
            let operation = entries.shift();
            switch (operation) {
                case '+':
                    result = result + parseFloat(entries.shift());
                    break;
                case '-':
                    result = result - parseFloat(entries.shift());
                    break;
                case 'x':
                    result = result * parseFloat(entries.shift());
                    break;
                case '%':
                    result = result / parseFloat(entries.shift());
                    break;
            }

        }

        $(".calc__input").html(result);
        let curQuery = $(".calc__query").html();
        $(".calc__query").html(curQuery + "=" + result);
    }

});