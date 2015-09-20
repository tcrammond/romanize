/**
 * Created by tyler on 20/09/2015.
 */

function romanize(input) {

    var numerals = [
        {
            letter: 'I',
            number: 1,
            repeats: true
        },
        {
            letter: 'V',
            number: 5
        },
        {
            letter: 'X',
            number: 10,
            repeats: true
        },
        {
            letter: 'L',
            number: 50
        },
        {
            letter: 'C',
            number: 100,
            repeats: true
        },
        {
            letter: 'D',
            number: 500
        },
        {
            letter: 'M',
            number: 1000,
            repeats: true
        }
    ];

    var result = '';
    var ones = 0;
    var tens = 0;
    var hundreds = 0;
    var thousands = 0;
    var highestNumeral;

    /*
    Separate the number into different thousands/hundreds/etc.

    Each unit is processed independently in order to:
    - obey the rule that each unit is treated / written as a separate item
    - obey the rule that rather than repeating a number 4 times you use subtraction notation, e.g. VIIII becomes IX
     */

    if (input >= 1000) {
        thousands = Math.floor(input / 1000) * 1000;
        input -= thousands;
    }
    if (input >= 100) {
        hundreds = Math.floor(input / 100) * 100;
        input -= hundreds;
    }
    if (input >= 10) {
        tens = Math.floor(input / 10) * 10;
        input -= tens;
    }
    if (input > 0) ones = input;

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

        highestNumeral = getHighestNumeralForNumber(number);

        /*
         If we are about to start repeating a number (e.g. 9 would become VIIII), we instead switch to subtraction
         notation (eg. 9 would instead be IX)
         */
        if (number / highestNumeral.number === 4) {

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
     * @returns {letter, number, repeats}|{letter, number}} Roman numeral object
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
     * @returns {{letter, number, repeats}|{letter, number}} Roman numeral object
     */
    function getNextHighestNumeralFromNumeral(numeral) {
        return numerals[numerals.indexOf(numeral) + 1];
    }
}

for(var i = 1; i <= 1000; i++) {
    console.log("%s\t-\t%s", i, romanize(i));
}