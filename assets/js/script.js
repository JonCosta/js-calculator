$(function () {

    allClear();

    // Listener to the buttons
    $(".calc__btn").click(function () {
        switch ($(this).val()) {
            case "AC":
                allClear();
                break;
            case "CE":
                clearEntry();
                break;
            case "=":
                let curQuery = $(".calc__query").html();
                if (!/[+|\-|x|\/]$/g.test(curQuery) && !(/\=/g.test(curQuery))) {
                    let result = calculate(curQuery);
                    // Prints the result in the main value
                    $(".calc__input").html(result.toString());
                    // Prints the result along with the full query
                    $(".calc__query").html(curQuery + "=" + result.toString());
                }
                break;
            default:
                setCalcVal($(this).val());
        }
    });

    /**
     * Resets the query and main values back to "0"
     */
    function allClear() {
        $(".calc__input").html(0);
        $(".calc__query").html(0);
    }

    /**
     * Removes the last number added to the query
     */
    function clearEntry() {
        let curQuery = $(".calc__query").html();
        if (/[+|\-|x|\/]\d+\.?\d*$/g.test(curQuery)) {
            $(".calc__input").html(0);
            $(".calc__query").html(curQuery.replace(/\d+\.?\d*$/g, ""));
        }

    }

    /**
     * Adds a new value (number or operator) to the current query
     * @param {String} newVal Number or operator (1, 2, 3... or +, -, * ...)
     */
    function setCalcVal(newVal) {
        let curVal = /=/g.test($(".calc__query").html()) ? '' : $(".calc__input").html();
        if (/\d|\./g.test(newVal)) {
            // Empties the value and the query if there's an "=" sign in the query
            let curQuery = /=/g.test($(".calc__query").html()) ? '' : $(".calc__query").html();
            // If the current operation is division, don't allow 0 to be pressed
            if (/\/$/g.test(curQuery) && newVal == "0") return false;
            let val = curVal == 0 ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(/[+|\-|x|\/]/g.test(curVal) ? newVal : val);
            $(".calc__query").html(curQuery == 0 ? +newVal : curQuery + "" + newVal);
        } else {
            // If the query has a result, start a new query with the result as first value
            let curQuery = /=/g.test($(".calc__query").html()) ? $(".calc__query").html().split("=")[1] : $(".calc__query").html();
            // If the query's last digit is an operator, change it for the new one
            if (/[+|\-|x|\/]$/g.test(curQuery)) curQuery = curQuery.replace(/[+|\-|x|\/]$/g, '');
            $(".calc__input").html(newVal);
            $(".calc__query").html(curQuery + "" + newVal);
        }
    }

    /**
     * Reads a query,
     * @param {String} entries The math operation to be read
     */
    function calculate(query) {
        query = query.replace("x", "*");
        let result = new Function('return ' + query)();
        if (/\.\d{3,}/g.test(result.toString())) {
            result = result.toFixed(3);
        }
        return result;
    }

});