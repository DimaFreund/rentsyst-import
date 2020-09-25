
export const compareTwoStrings = (s1, s2) =>
{
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

export const selectMoreSimilarOption = (list, compareValue) => {
    let maxSimilarIndex = 0;
    let maxSimilarValue = 0;
    for(let key = 0; key < list.length; key++) {
        let currentSimilar = compareTwoStrings(list[key].label, compareValue.replace('_id', '').replace('set_static_value', ''));
        if(currentSimilar > maxSimilarValue && currentSimilar > 0.35) {
            maxSimilarValue = currentSimilar;
            maxSimilarIndex = key;
        }
    }
    return {
        similarRate: maxSimilarValue,
        option: list[maxSimilarIndex],
        color: getColor(maxSimilarValue),
    };
}

function getColor(value) {
    var hue = (value * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
