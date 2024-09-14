import { FunctionField, SelectField } from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const difficultyChoices = generateDifficultyChoices();

const DifficultySelectField = (props) => {

    const getDifficultyRange = (value) => {
        // Map the stored difficulty value to the correct range
        const choice = difficultyChoices.find(choice => value >= choice.min && value <= choice.max);
        return choice ? choice.name : 'Unknown';
    };

    return (
        <FunctionField
            {...props}
            render={record => getDifficultyRange(record[props.source])} // Map stored value to range
        />
    );
};

export default DifficultySelectField;
