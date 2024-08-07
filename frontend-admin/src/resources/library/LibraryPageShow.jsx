import React, { useEffect, useState } from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  ArrayField,
  Datagrid,
  NumberField,
  TopToolbar,
  useRecordContext,
  SimpleForm,
  EditActions,
  EditButton,
} from "react-admin";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNotify, useRefresh, useDataProvider } from 'react-admin';
import { TextField as MuiTextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function LibraryPageShow(props) {
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
        <CustomAddOptionButton label="Add Module"/>
      </TopToolbar>
    );
  };
  
  const AddOptionDialog = ({ open, handleClose }) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const record = useRecordContext();
    const dataProvider = useDataProvider();
  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [position, setPosition] = useState(0);
  
    const handleSubmit = async () => {
      try {
        await dataProvider.create('library_page_modules', {
          data: {
            title: title,
            content: content,
            position: position,
            library_page_id: record.id,
          },
        }).then(function(){
          setTitle('');
          setContent('');
          setPosition(0);
        });
        notify('Option added successfully', { type: 'success' });
        refresh();
        handleClose();
      } catch (error) {
        notify('Error: could not add option', { type: 'error' });
      }
    };

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Add new module</DialogTitle>
        <DialogContent>
          <SimpleForm toolbar={false}>
            <MuiTextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
            />
            
            <MuiTextField
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
              margin="dense"
            />

            <RichTextInput
              source="content"
              label="Content"
              value={content}
              onChange={(e) => setContent(e)}
              fullWidth
              margin="dense"
            />
          </SimpleForm>
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

  const ModulesPreview = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const [modules, setModules] = useState([]);

    console.log(record);
    useEffect(() => {
      const fetchModules = async () => {
        const { data } = await dataProvider.getList('library_page_modules', {
          filter: { library_page_id: record.id },
          sort: { field: 'position', order: 'ASC' },
          pagination: { page: 1, perPage: 100}
        });
        setModules(data);
      };
      fetchModules();
    }, [dataProvider, record.id]);

    return (
      <div>
        <h2>{record.title}</h2>
        {modules.map(module => (
          <div key={module.id} style={{ marginBottom: '1em' }}>
            <h3>{module.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: module.content }} />
          </div>
        ))}
      </div>
    );
  };

  const CustomEditButton = () => {
    const record = useRecordContext();
    return (
      <Button
        component={Link}
        to={`/library_page_modules/${record.id}`}
        startIcon={<EditIcon />}
        label="Edit"
      >
        Edit
      </Button>
    );
  };

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
        </Tab>
        <Tab label="Modules">
          <OptionToolbar/>
          <ArrayField source="modules" label="">
            <Datagrid bulkActionButtons={false}>
              <TextField source="title" label="Title" />
              <RichTextField source="content" label="Content" />
              <NumberField source="position" label="Position Number" />
              <CustomEditButton />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Preview">
          <ModulesPreview />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
