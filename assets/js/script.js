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
        fitText();
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
        let curVal = $(".calc__input").html();

        if (/\d/g.test(newVal)) {
            // Empties the value and the query if there's an "=" sign in the query
            let curQuery = /=/g.test($(".calc__query").html()) ? '' : $(".calc__query").html();
            // If the current operation is division, don't allow 0 to be pressed
            if ((/\/$/g.test(curQuery) && newVal == "0") || (/\./g.test(curVal) && newVal == ".")) return false;
            let val = curVal == "0" ? +newVal : curVal + "" + newVal;
            $(".calc__input").html(/[+|\-|x|\/]/g.test(curVal) ? newVal : val);
            $(".calc__query").html(curQuery == "0" ? +newVal : curQuery + "" + newVal);
        } else if (/\./g.test(newVal)) {
            // Check if the last number entry already has a "."
            if (/\./g.test(curVal)) return false;
            let curQuery = /=/g.test($(".calc__query").html()) ? $(".calc__query").html().split("=")[1] : $(".calc__query").html();
            // If the "currentVal" is a symbol (+ - / *), add "0.0"
            $(".calc__input").html(/[+|\-|x|\/]/g.test(curVal) ? "0." : curVal + newVal);
            $(".calc__query").html(/[+|\-|x|\/]$/g.test(curQuery) ? curQuery + "0." : curQuery + newVal);
        } else {
            if (/\.$/g.test(curVal)) return false;
            // If the query has a result, start a new query with the result as first value
            let curQuery = /=/g.test($(".calc__query").html()) ? $(".calc__query").html().split("=")[1] : $(".calc__query").html();
            if (newVal == "-") {
                curQuery = curQuery.replace(/[+|\-]$/g, '');
            } else {
                // If the query's last digit is an operator, change it for the new one
                if (/[x|\/]\-$/g.test(curQuery)) return false;
                if (/[+|\-|x|\/]$/g.test(curQuery)) curQuery = curQuery.replace(/[+|\-|x|\/]$/g, '');

            }
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

    /**
     * Reduces the font size when it overflows the display div
     */
    function fitText() {
        let el = document.querySelector(".calc__display");
        if ((el.offsetHeight < el.scrollHeight) || (el.offsetWidth < el.scrollWidth)) {
            while ((el.offsetHeight < el.scrollHeight) || (el.offsetWidth < el.scrollWidth)) {
                // Adjusts the main value's size
                let textSize = $(".calc__input").css("font-size");
                $(".calc__input").css("font-size", (parseInt(textSize) - 1) + "px");
                // Also adjusts the query's size to keep the proportion
                textSize = $(".calc__query").css("font-size");
                $(".calc__query").css("font-size", (parseInt(textSize) - 1) + "px");
            }
        } else {
            $(".calc__input").css("font-size", "55px");
            $(".calc__query").css("font-size", "22px");
        }
    }

});