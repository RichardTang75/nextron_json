import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { ChangeEvent } from 'react';

// Component for choosing a file
export default function FileInput(props) {
    const [file_name, setFile_name] = React.useState('Select a file...');
    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File = e.target.files[0];
        // handle error
        if (file !== undefined && file.type !== 'application/json') {
            alert('Please select a JSON file');
            return;
        }
        else if (file === undefined) {
            alert('Selected file is undefined')
            return;
        }
        else {
            setFile_name(file.name);
            props.onChange(file);
        }
    };
    return (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Button variant="contained" component="label" startIcon={<UploadIcon />}> 
            Upload
            <input type="file" id="file" hidden onChange={handleFileInput} />
            </Button>
            <Typography variant="h6" gutterBottom color="text.secondary">
                {file_name}
            </Typography>
        </Stack>
    );
}