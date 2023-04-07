import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileInput from '../components/FileInput';
import TreeJson from '../components/TreeJson';
import { styled, Stack, Box } from '@mui/material';
const fs = require('fs');

const Root = styled('div')(({ theme }) => {
    return {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    };
})


function Home() {
    const [selected_json, setSelected_json] = React.useState<Object>(new Object());
    const [file_name, setFile_name] = React.useState<string>('No File Selected');
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const get_node_and_children = (node: string, json: Object): string[] => {
        let children = json[node];
        if (children !== undefined) {
            if (typeof children === 'string') {
                console.log()
                return [node, children];
            }
            else if (typeof children === 'object') {
                return [node, ...Object.keys(children).map((child) => get_node_and_children(child, children)).flat()];
            }
            else {
                return [node];
            }
        }
        else {
            return [node];
        }
    };
    const get_all_nodes_and_children = (json: Object) => {
        return Object.keys(json).map((node) => get_node_and_children(node, json)).flat();
    };
    const all_nodes_and_children = get_all_nodes_and_children(selected_json);
    console.log(all_nodes_and_children);

    const handleFileInput = (file) => {
        let file_path = file.path;
        let file_data = fs.readFileSync(file_path, 'utf8');
        let file_json = JSON.parse(file_data);
        setSelected_json(file_json);
        setFile_name(file.name);
    };
    const handleToggle = (event, nodeIds: string[]) => {
        setExpanded(nodeIds);
        console.log(expanded)
    };
    const handleSelect = (event, nodeIds: string[]) => {
        setSelected(nodeIds);
        console.log(selected)
    };
    const handleExpandCollapseClick = () => {
        if (Object.keys(selected_json).some((node) => expanded.includes(node))) {
            setExpanded([]);
        } else {
            setExpanded(all_nodes_and_children);
        }
        console.log(expanded)
    };
    const handleSelectDeselectClick = () => {
        console.log(selected)
        if (selected.length === 0) {
            setSelected(all_nodes_and_children);
        } else {
            setSelected([]);
        }
        console.log(selected)
    };
    return (<React.Fragment>
        <Head>
            <title>Home - Nextron (with-typescript-material-ui)</title>
        </Head>
        <Root>
            <FileInput onChange={handleFileInput} />
            <hr />
            <Typography variant="h4" component="h1" gutterBottom>
                {file_name}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Button variant="contained" onClick={handleExpandCollapseClick}>
                    {Object.keys(selected_json).some((node) => expanded.includes(node)) ? 'Collapse All' : 'Expand All'}
                </Button>
                <Button variant="contained" onClick={handleSelectDeselectClick}>
                    {selected.length === 0 ? 'Select All' : 'Deselect All'}
                </Button>
            </Stack>
            < TreeJson json={selected_json} props={{ expanded, selected }} clicks={{ handleToggle, handleSelect }} />
        </Root>
    </React.Fragment>
    );
};

export default Home;
