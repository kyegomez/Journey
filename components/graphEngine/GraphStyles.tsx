import { useEffect } from 'react';

export function GraphStyles() {
    useEffect(() => {
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        const textBackground = getComputedStyle(document.documentElement).getPropertyValue('--surface-a');
        const primaryLight = getComputedStyle(document.documentElement).getPropertyValue('--primary-500');
        const surfaceA = getComputedStyle(document.documentElement).getPropertyValue('--surface-a');
        const surface500 = getComputedStyle(document.documentElement).getPropertyValue('--surface-500');

        const levels = [];
        const colors = ['--primary-color', '--pink-500', '--green-500', '--blue-500', '--yellow-500', '--cyan-500'];

        for (let i = 0; i < 16; i++) {
            const color = colors[i % colors.length];
            levels.push({
                selector: `node[level=${i + 1}]`,
                style: {
                    'background-color': getComputedStyle(document.documentElement).getPropertyValue(color),
                },
            });
        }

        const nodeStyles = [
            {
                selector: 'edge',
                style: {
                    'line-color': primary,
                    width: 1,
                    'curve-style': 'haystack',
                },
            },
            {
                selector: 'node',
                style: {
                    content: 'data(label)',
                    'text-valign': 'bottom',
                    'text-halign': 'center',
                    'text-wrap': 'wrap',
                    'text-max-width': '100px',
                    width: 32,
                    height: 32,
                },
            },
            {
                selector: 'node[type="root"]',
                style: {
                    width: 'data(width)',
                    height: 'data(height)',
                    'background-color': primary,
                    'border-width': 1,
                    'border-opacity': 0.7,
                    shape: 'round-hexagon',
                    'text-background-shape': 'roundrectangle',
                    color: textColor,
                    'text-background-color': textBackground,
                    'text-background-opacity': 0.65,
                    'font-weight': 'bold',
                    'font-size': '14px',
                },
            },
            {
                selector: 'node[type="project"]',
                style: {
                    width: 'data(width)',
                    height: 'data(height)',
                    'background-width': '36px',
                    'background-height': '36ppx',
                    'background-color': primaryLight,
                    'border-width': 1,
                    'border-opacity': 0.7,
                    shape: 'round-hexagon',
                    'text-background-shape': 'roundrectangle',
                    color: textColor,
                    'text-background-color': textBackground,
                    'text-background-opacity': 0.3,
                    'font-weight': 'bold',
                    'font-size': '14px',
                },
            },
            {
                selector: 'node[type="ks"]',
                style: {
                    'background-color': '#FFFFFF',
                    width: 32,
                    height: 32,
                    'border-color': '#CACACA',
                    'border-width': 2,
                    'border-opacity': 0.8,
                    'source-label': 'This is a source',
                    color: textColor,
                    'text-background-color': textBackground,
                    'text-background-shape': 'roundrectangle',
                    'text-background-opacity': 0.65,
                    'text-wrap': 'ellipsis',
                    'text-max-width': '128px',
                    'font-weight': 'normal',
                    'font-size': '12px',
                    ghost: 'yes',
                    'ghost-opacity': 0.3,
                    'ghost-offset-x': 1,
                    'ghost-offset-y': 1,
                    'background-image': 'data(ks.icon)',
                },
            {
                selector: ':selected',
                style: {
                    'border-width': 4,
                    'border-color': primary,
                },
            },
            {
                selector: '.search-result',
                style: {},
            },
            {
                selector: '.not-search-result',
                style: {
                    content: '',
                    'border-width': 0,
                    'background-color': surface500,
                    'background-opacity': 0.9,
                    'background-image': 'none',
                },
            },
            {
                selector: '.search-path-node',
                style: {
                    'border-width': 8,
                },
            },
            {
                selector: '.search-path-edge',
                style: {
                    width: 6,
                },
            },
        ];

        cytoscape.use(require('cytoscape-stylesheet'));
        cytoscape.stylesheet().fromJson(nodeStyles.concat(levels)).addTo(cytoscape.stylesheet());
    };
}, []);

return null;
}
