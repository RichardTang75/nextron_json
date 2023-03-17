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
    return nodes.map((node) => {
        if (node.children) {
            return (
                <TreeItem key={node.key} nodeId={node.key} label={node.key}>
                    {renderTree(node.children)}
                </TreeItem>
            );
        }
        else {
            return <TreeItem key={node.key} nodeId={node.key} label={node.key + ': ' + node.name} />;
        }
});
}

export default function JSONTree(props) {
    const json = props.json;
    const { expanded, selected} = props.props;
    const { handleToggle, handleSelect } = props.clicks;

    if (typeof json !== 'object') {
        return null;
    }
    console.log(renderTreeNodes(json));
    console.log(Object.keys(json));
    console.log(renderTree(renderTreeNodes(json)));
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
        >
            { renderTree(renderTreeNodes(json))}
        </TreeView>
    );
}