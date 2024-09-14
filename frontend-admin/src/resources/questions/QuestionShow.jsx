import React, { useState } from "react";
import { 
  TextField, 
  Show, 
  TabbedShowLayout, 
  Tab, 
  ArrayField, 
  ImageField, 
  SingleFieldList, 
  ChipField, 
  ReferenceField,
  SelectField,
  RichTextField,
  Datagrid,
  BooleanField,
  useRecordContext,
  TopToolbar
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNotify, useRefresh, useDataProvider } from 'react-admin';
import { TextField as MuiTextField, Switch, FormControlLabel} from '@mui/material';
import DifficultySelectField from "../../components/general/DifficultySelectField";

const CustomAddOptionButton = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        {props.label}
      </Button>
      <AddOptionDialog open={open} handleClose={handleClose} />
    </>
  );
};

const OptionToolbar = () => {
  return (
    <TopToolbar>
      <CustomAddOptionButton label="Add Option"/>
    </TopToolbar>
  );
};

const AddOptionDialog = ({ open, handleClose }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const dataProvider = useDataProvider();

  const [optionText, setOptionText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async () => {
    try {
      await dataProvider.create('question_options', {
        data: {
          option_text: optionText,
          is_correct: isCorrect,
          question_id: record.id,
        },
      }).then(function(){

        setOptionText('');
        setIsCorrect(false);
      });
      notify('Option added successfully', { type: 'success' });
      refresh();
      handleClose();
    } catch (error) {
      notify('Error: could not add option', { type: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new option</DialogTitle>
      <DialogContent>
        <MuiTextField
          label="Text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          fullWidth
          margin="dense"
        />
        <FormControlLabel control={<Switch
          checked={isCorrect}
          onChange={(e) => setIsCorrect(e.target.checked)}
          inputProps={{ "aria-label": 'controlled' }}
        />
        } label="Correct?" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomAddTopicButton = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        {props.label}
      </Button>
      <AddTopicDialog open={open} handleClose={handleClose} />
    </>
  );
};

const TopicToolbar = () => {
  return (
    <TopToolbar>
      <CustomAddTopicButton label="Add Topic"/>
    </TopToolbar>
  );
};

const AddTopicDialog = ({ open, handleClose }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const dataProvider = useDataProvider();

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = async () => {
    try {
      await dataProvider.create('question_topics', {
        data: {
          name,
          tag,
          question_id: record.id,
        },
      });
      notify('Topic added successfully', { type: 'success' });
      refresh();
      handleClose();
    } catch (error) {
      notify('Error: could not add topic', { type: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a New Topic</DialogTitle>
      <DialogContent>
        <MuiTextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <MuiTextField
          label="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function QuestionShow(props) {
  // const difficultyChoices = generateDifficultyChoices(1, 10);

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <RichTextField source="title" />

          <ReferenceField source="type_id" reference="question_types" label="Question Type">
            <TextField source="name" />
          </ReferenceField>

          <ReferenceField source="user_id" reference="users" label="Author">
            <TextField source="name" />  
          </ReferenceField>

          <SelectField source="status" choices={[
              { id: 'active', name: 'Active' },
              { id: 'inactive', name: 'Inactive' },
              { id: 'pending', name: 'Pending' },
          ]} />

          {/* <SelectField source="difficulty" choices={difficultyChoices} /> */}
          <DifficultySelectField source="difficulty" />
          <RichTextField source="explanation" />
          <RichTextField source="hint" />
          <ImageField source="image" label="Imagem descritiva" />

          <ArrayField source="tags">
            <SingleFieldList linkType={false}>
              <ChipField source="title" size="small" />
            </SingleFieldList>
          </ArrayField>

        </Tab>
        <Tab label="Options">
          <OptionToolbar resource="question_options"/>
          <ArrayField source="options" label="">
            <Datagrid optimized bulkActionButtons={false}>
              <TextField source="option_text" label="Option" />
              <BooleanField source="is_correct" label="Correct?" />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Related Topics">
          <TopicToolbar />
          <ArrayField source="topics" label="">
            <Datagrid bulkActionButtons={false}>
              <TextField source="name" label="Topic" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
