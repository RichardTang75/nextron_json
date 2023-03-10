import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Link from '../components/Link';
import FileInput from '../components/FileInput';
import TreeJson from '../components/TreeJson';
import {styled} from '@mui/material';
import {TreeItem, TreeView} from '@mui/lab';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const fs = require('fs');

const Root = styled('div')(({theme}) => {
    return {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    };
})


function Home() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleClick = () => setOpen(true);
    const [selected_json, setSelected_json] = React.useState( new Object());
    const handleFileInput = (file) => {
        let file_path = file.path;
        let file_data = fs.readFileSync(file_path, 'utf8');
        let file_json = JSON.parse(file_data);
        setSelected_json(file_json);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Home - Nextron (with-typescript-material-ui)</title>
            </Head>
            <Root>
                <FileInput onChange={handleFileInput}/>
                <hr />
                < TreeJson json={selected_json}/>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Super Secret Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>1-2-3-4-5</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h4" gutterBottom>
                    Material-UI
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    with Nextron
                </Typography>
                <img src="/images/logo.png"/>
                <Typography gutterBottom>
                    <Link href="/next">Go to the next page</Link>
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Super Secret Password
                </Button>
            </Root>
        </React.Fragment>
    );
};

export default Home;
