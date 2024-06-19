export const generateDifficultyChoices = (min, max) => {
    let choices = [];
    for (let i = min; i <= max; i++) {
        choices.push({ id: i, name: i.toString() });
    }
    return choices;
};