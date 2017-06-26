$(function () {

    reset();

    // Listener to the buttons
    $(".calc__btn").click(function () {
        switch ($(this).val()) {
            case "CL":
                reset();
                break;
            case "=":
                if (!/=/g.test($(".calc__query").html())) {
                    //We get an array with the grouped numbers and the operators in the query's order
                    let entries = groupQueryNumbers($(".calc__query").html());
                    calculate(entries);
                }
                break;
            default:
                setCalcVal($(this).val());
        }
    });

    /**
     * Resets the query and main values back to "0"
     */
    function reset() {
        $(".calc__input").html(0);
        $(".calc__query").html(0);
    }

    /**
     * Adds a new value (number or operator) to the current query
     * @param {String} newVal Number or operator (1, 2, 3... or +, -, * ...)
     */
    function setCalcVal(newVal) {
        let curVal = /=/g.test($(".calc__query").html()) ? '' : $(".calc__input").html();
        if (/\d/g.test(newVal)) {
            // Empties the value and the query if there's an "=" sign in the query
            let curQuery = /=/g.test($(".calc__query").html()) ? '' : $(".calc__query").html();
            // If the current operation is division, don't allow 0 to be pressed
            if (/\/$/g.test(curQuery) && newVal == "0") return false;
            let val = curVal == 0 ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(/\D/g.test(curVal) ? newVal : val);
            $(".calc__query").html(curQuery == 0 ? +newVal : curQuery + "" + newVal);
        } else {
            // If the query has a result, start a new query from the result
            let curQuery = /=/g.test($(".calc__query").html()) ? $(".calc__query").html().split("=")[1] : $(".calc__query").html();
            $(".calc__input").html(newVal);
            $(".calc__query").html(curQuery + "" + newVal);
        }
    }

    /**
     * Reads a query,
     * @param {String} query The math operation to be read
     */
    function calculate(entries) {
        // Will run through the entries array, working with each removed (shifted) value
        while (entries.length > 0) {
            // Obtains the first number value and declares the result container
            if (result === undefined) {
                // var result = parseFloat(entries.shift());
                var result = new Big(entries.shift());
            }
            let operation = entries.shift();
            // Execute a different procedure based on the number/operator]clg
            console.log(operation);
            switch (operation) {
                // Sum
                case '+':
                    result = result.plus(entries.shift());
                    break;
                // Subtract
                case '-':
                    result = result.minus(entries.shift());
                    break;
                // Multiply
                case 'x':
                    result = result.times(entries.shift());
                    break;
                // Divide
                case '/':
                    result = result.div(entries.shift());
                    break;
            }

        }
        // Prints the result in the main value
        $(".calc__input").html(result.toString());
        // Prints the result along with the full query
        let curQuery = $(".calc__query").html();
        $(".calc__query").html(curQuery + "=" + result.toString());
    }

    /**
     * Reads the math query and return an array with numbers grouped and operators separated
     * @param {String} query The math operation to be read
     */
    function groupQueryNumbers(query) {
        let arr = [];
        // Runs through each element of the query
        query.split("").forEach(function (element, index) {
            // If it's an operator, simply push it into arr
            if (/[+|\-|x|\/]/g.test(element)) {
                arr.push(element);
            } else {
                // Verifies for numbers with multiple digits and in floating point
                if (/\d+\.?\d*/g.test(arr[arr.length - 1])) {
                    arr[arr.length - 1] += element;
                } else {
                    arr.push(element);
                }
            }
        });
        return arr;
    }

});