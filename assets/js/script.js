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

        if (/\d/g.test(newVal)) {
            // Empties the value and the query if there's an "=" sign in the query
            let curQuery = /=/g.test($(".calc__query").html()) ? '' : $(".calc__query").html();
            // If the current operation is division, don't allow 0 to be pressed
            if (/\/$/g.test(curQuery) && newVal == "0") return false;
            let val = curVal == 0 ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(/\D/g.test(curVal) ? newVal : val);
            $(".calc__query").html(curQuery == 0 ? +newVal : curQuery + "" + newVal);
        } else {
            let curQuery = /=/g.test($(".calc__query").html()) ? $(".calc__query").html().split("=")[1] : $(".calc__query").html();
            // It's a symbol, so we need to calculate OR add it to the query
            if (/[+|\-|x|\/]/g.test(curQuery)) {
                let numbers = curQuery.split(/[+|\-|x|\/]/g);
                // Replaces the operation if there's already an active operation
                if (!(numbers[1])) {
                    $(".calc__input").html(newVal);
                    $(".calc__query").html(curQuery.replace(/[+|\-|x|\/]/g, newVal));
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
        //We get an array with the grouped numbers and the operators in the query's order
        let entries = groupQueryNumbers(query);
        // Will run through the entries array, working with each removed (shifted) value
        while (entries.length > 0) {
            // Obtains the first number value and declares the result container
            if (result === undefined) {
                var result = parseFloat(entries.shift());
            }
            let operation = entries.shift();
            // Execute a different procedure based on the number/operator
            switch (operation) {
                // Sum
                case '+':
                    result += parseFloat(entries.shift());
                    break;
                // Subtract
                case '-':
                    result -= parseFloat(entries.shift());
                    break;
                // Multiply
                case 'x':
                    result *= parseFloat(entries.shift());
                    break;
                // Divide
                case '/':
                    result /= parseFloat(entries.shift());
                    break;
            }
            console.log(Big(3.12).times(9));

        }

        $(".calc__input").html(result);
        let curQuery = $(".calc__query").html();
        $(".calc__query").html(curQuery + "=" + result);
    }

    /**
     * Reads the math query and return an array with numbers grouped and operators separated
     * @param {String} query The math opreation to be read
     */
    function groupQueryNumbers(query) {
        let arr = [];
        query.split("").forEach(function (element, index) {
            if (/[+|\-|x|\/]/g.test(element)) {
                arr.push(element);
            } else {
                if (/\d+\.?\d*/g.test(arr[arr.length - 1])) {
                    arr[arr.length - 1] += element;
                } else {
                    arr.push(element);
                }
            }
        });
        console.log(parseFloat("3.12"));
        return arr;
    }

});