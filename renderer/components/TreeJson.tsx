import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const renderTreeNodes = (json_object) => {
    if (typeof json_object !== 'object') {
        return null;
    }
    return Object.keys(json_object).map((key) => ({
        key: key,
        name: json_object[key].toString(),
        children: renderTreeNodes(json_object[key]),
    })
    );
}

const renderTree = (nodes) => {
    return nodes.map((node) => (
        <TreeItem key={node.key} nodeId={node.key} label={node.key}>
            { Array.isArray(node.children) ? renderTree(node.children) : node.name}
        </TreeItem>
    ));
}

export default function JSONTree(props) {
    let json = props.json;
    if (typeof json !== 'object') {
        return null;
    }
    let tree_items = [];
    for (let key in json) {
        tree_items.push(<TreeItem nodeId={key} label={key} />);
    }
    console.log(tree_items);
    console.log(renderTreeNodes(json));
    console.log(Object.keys(json));
    console.log(renderTree(renderTreeNodes(json)));
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            { renderTree(renderTreeNodes(json))}

            <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
        </TreeView>
    );
}