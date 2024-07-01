import React, { useState } from "react";
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
} from "react-admin";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNotify, useRefresh, useDataProvider } from 'react-admin';
import { TextField as MuiTextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
        </Tab>
        <Tab label="Modules">
          <OptionToolbar resource="library_page_modules"/>
          <ArrayField source="modules" label="">
            <Datagrid optimized bulkActionButtons={false}>
              <TextField source="title" label="Title" />
              <RichTextField source="content" label="Content" />
              <NumberField source="position" label="Position Number" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
