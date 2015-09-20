/**
 * Created by tyler on 20/09/2015.
 */

function romanize(input) {

    /*
     Separate the number into thousands/hundreds/etc.

     Each unit is processed independently in order to:
     - obey the rule that each unit is treated / written as a separate item
     - obey the rule that rather than repeating a number 4 times you use subtraction notation, e.g. VIIII becomes IX
     */
    var thousands = Math.floor(input / 1000) * 1000;
    var hundreds = Math.floor((input - thousands) / 100) * 100;
    var tens = Math.floor((input - thousands - hundreds) / 10) * 10;
    var ones = input - thousands - hundreds - tens;

    var numerals = [
        {
            letter: 'I',
            number: 1
        },
        {
            letter: 'V',
            number: 5
        },
        {
            letter: 'X',
            number: 10
        },
        {
            letter: 'L',
            number: 50
        },
        {
            letter: 'C',
            number: 100
        },
        {
            letter: 'D',
            number: 500
        },
        {
            letter: 'M',
            number: 1000
        }
    ];
    var result = '';

    convertToNumerals(thousands);
    convertToNumerals(hundreds);
    convertToNumerals(tens);
    convertToNumerals(ones);

    return result;

    /**
     * Recursively calculates roman numerals for the given number and appends numerals to result
     * @param {Number} number
     */
    function convertToNumerals(number) {
        if (number <= 0) return;

        var highestNumeral = getHighestNumeralForNumber(number);

        /*
         If we are about to start repeating a number (e.g. 9 would become VIIII), we instead switch to subtraction
         notation (eg. 9 would instead be IX)

         also if it's M (the highest numeral) repeating, we want to leave it alone
         */
        if (number / highestNumeral.number === 4 && highestNumeral.number < 1000) {

            /*
            If this has occurred at the start of the string, we need the numeral that's one "rank" up, otherwise we will
            need the numeral that's two "ranks" up as we have to replace an existing numeral.
             */
            if (!result.length) {
                result += highestNumeral.letter;
                result += getNextHighestNumeralFromNumeral(highestNumeral).letter;
            } else {

                // The previous numeral is removed as we need to replace it with subtraction notation
                result = result.slice(0, result.length - 1);

                result += highestNumeral.letter;
                result += getNextHighestNumeralFromNumeral(getNextHighestNumeralFromNumeral(highestNumeral)).letter;
            }

            return;
        }

        result += highestNumeral.letter;
        number -= highestNumeral.number;


        if (number > 0) convertToNumerals(number);
    }

    /**
     * Returns the highest numeral that divides into the given number
     * @param {Number} number
     * @returns {letter, number}} Roman numeral object
     */
    function getHighestNumeralForNumber(number) {
        var highest;

        for (var i = 0; i < numerals.length; i++) {
            if (number / numerals[i].number >= 1) {
                highest = numerals[i];
            }
        }

        return highest;
    }

    /**
     * Returns the next highest roman numeral from the given numeral object.
     * @param {object} numeral
     * @returns {{letter, number}} Roman numeral object
     */
    function getNextHighestNumeralFromNumeral(numeral) {
        return numerals[numerals.indexOf(numeral) + 1];
    }
}