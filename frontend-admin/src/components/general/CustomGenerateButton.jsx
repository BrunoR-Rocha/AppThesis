import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNotify, useRefresh } from 'react-admin';
import { httpClient } from '../../providers/dataProvider';
import apiUrl from '../../providers/apiUrl';
import { CircularProgress } from '@mui/material';

const CustomGenerateButton = ({label, method = 'GET', endpoint, icon = null, requestData = null}) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await httpClient(apiUrl + endpoint, {
                method: method,
                body: requestData,
              })
                .then(() => {
                    notify('Operation successful!', { type: 'info' });
                    refresh();
                })
                .catch((err) => notify(err.message, { type: "error" }));
        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleClick} disabled={loading} startIcon={icon}>
            {loading ? <CircularProgress size={24} color="inherit" /> : label}
        </Button>
    );
};

export default CustomGenerateButton;