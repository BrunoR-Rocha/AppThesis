export const generateDifficultyChoices = () => {
    return [
        { id: '1-20', name: "Very Easy", min: 1, max: 20 },
        { id: '21-40', name: "Easy", min: 21, max: 40 },
        { id: '41-60', name: "Medium", min: 41, max: 60 },
        { id: '61-80', name: "Hard", min: 61, max: 80 },
        { id: '81-100', name: "Very Hard", min: 81, max: 100 }
    ];
};