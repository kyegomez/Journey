
// import React, { useEffect, useState } from 'react';
// // import dynamic from 'next/dynamic';
// import { Need } from '@/types/Need';
// import  GraphNode  from './GraphNode';

// interface GraphProps {
//   // Add any additional props as needed
// }

// // const GraphNode = dynamic(() => import('./GraphNode'), { ssr: false });

// const Graph: React.FC<GraphProps> = () => {
//   const [needs, setNeeds] = useState<Need[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('needs.json'); // Adjust the file path if needed
//         const data = await response.json();
//         setNeeds(data);
//       } catch (error) {
//         console.error('Error fetching needs:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="w-screen flex justify-center items-center h-screen">
//       <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-4 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-white mb-4">Needs and Technologies</h2>
//         <div className="grid grid-cols-2 gap-4">
//         {Object.entries(needs).map(([key, value]) => (
//             <GraphNode key={key} need={value} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Graph;








//===================+>
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/router';


interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface TreeNode {
  id: number;
  _children: d3.HierarchyNode<unknown>[];
  children: d3.HierarchyNode<unknown>[];
  x: number;
  y: number;
  x0: number;
  y0: number;
  data: {
    id: string;
    completion: number;
    condition: string;
  };
}

async function getData(file: string): Promise<any> {
  const response = await fetch(file);
  return response.json();
}

const NeedsTree: React.FC = () => {
  const treeRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function getData(file: string) {
      const response = await fetch(file);
      return response.json();
    }

    (async () => {
      const data = await getData('./needs.json');

      const margin = { top: 0, right: 50, bottom: 100, left: 80 };
      const height = 1000;
      const width = height * 2.5;
      const root = d3.hierarchy(data);
      const dx = height / 25;
      const dy = height / 3;
      const tree = d3.tree().nodeSize([dx, dy]);
      const diagonal = d3
        .linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x);

      // @ts-ignore
        root.x0 = dy / 2;
      // @ts-ignore
      root.y0 = 0;
      root.descendants().forEach((d: any, i: any) => {
        d.id = i;
        d._children = d.children;
      });

      tree(root);

      var svg = d3.select(".tree").append("svg")
        .attr("width", 2000)
        .attr("height", 1200);

      const gLink = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1);

      const gNode = svg
        .append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");
      // @ts-ignore
      svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.5, 3])
        .on("zoom", zoomed));

        // @ts-ignore
      function zoomed({ transform }) {
        gLink.attr("transform", transform);
        gNode.attr("transform", transform);
      }

      // Toggle all children of a node
      function toggleAll(d: any) {
        if (d.children) {
          d.children.forEach(toggleAll);
          toggle(d);
        }
      }

      // Toggle children
      function toggle(d: any) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      }

      // Linebreak for longer node names
      function lineBreak(text: any, width: any) {
        text.each( () => {
          // @ts-ignore
          var el: any = d3.select(this);
          let words: any = el.text().split(' ');
          let wordsFormatted: any = [];

          let string = '';
          for (let i = 0; i < words.length; i++) {
            if (words[i].length + string.length <= width) {
              string = string + words[i] + ' ';
            }
            else {
              wordsFormatted.push(string);
              string = words[i] + ' ';
            }
          }
          wordsFormatted.push(string);

          el.text('');
          for (var i = 0; i < wordsFormatted.length; i++) {
            var tspan = el.append('tspan').text(wordsFormatted[i]);
            if (i > 0 && i < 2)
              tspan.attr('x', -width / 1.5).attr('y', width / 1.4);
          }
        });
      }

      function percentageToHsl(percentage: string, saturation: string, lightness: string) {
        return 'hsl(' + percentage + ', ' + saturation + ',' + lightness + ')';
      }

      // Initialize display to open tree
      // @ts-ignore
      update(root);

      function update(source: { y0: any; x0: any; y: any; x: any; }) {
        // @ts-ignore
        const duration = d3.event && d3.event.altKey ? 2500 : 250;
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout

        let left = root;
        let right = root;
        // @ts-ignore
        root.eachBefore((node: { x: number; }) => {
          // @ts-ignore
          if (node.x < left.x) left = node;
          // @ts-ignore
          if (node.x > right.x) right = node;
        });

        // @ts-ignore
        const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg
          .transition()
          .duration(duration)
          // @ts-ignore
          .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
          .tween(
            "resize",
            // @ts-ignore
            window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
          );

        // Update the nodes
        const node = gNode.selectAll("g")
        // @ts-ignore
          .data(nodes, (d: { id: any; }) => d.id);

        // Enter any new nodes at the parent's previous position
        const nodeEnter = node
          .enter()
          .append("g")
          .attr("transform", (d: any) => `translate(${source.y0},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0)
          // @ts-ignore
          .on("click", (event: any, d: { children: any; _children: any; }) => {
            d.children = d.children ? null : d._children;
              // @ts-ignore

            update(d);
          });

        nodeEnter
          .append("circle")
          .attr("r", 12)
          // @ts-ignore
          .attr("fill", (d: { _children: any; data: { completion: any; }; }) => (d._children ? percentageToHsl(d.data.completion, '65%', '75%') : percentageToHsl(d.data.completion, '65%', '50%')))
          .attr("stroke-width", 10);

        nodeEnter
          .append("text")
          .text((d: { data: { id: any; }; }) => d.data.id)
          .call(lineBreak, 30)
          .attr("dy", "0.32em")
          .attr("x", -20)
          .attr("text-anchor", "end")
          // @ts-ignore
          .attr("font-weight", (d: { _children: any; }) => (d._children ? "" : "bold"))
          .clone(true)
          .lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 10)
          .attr("stroke", "white");

        nodeEnter
          .append("text")
          .text((d: { data: { completion: any; }; }) => d.data.completion)
          .attr("dy", "0.31em")
          .attr("text-anchor", "middle")
          .style("font", "12px sans-serif")
          .style("fill", "white");

        nodeEnter
          .append("title")
          .text((d: { data: { condition: any; }; }) => d.data.condition);

        // Transition nodes to their new position
        node
        // @ts-ignore
          .merge(nodeEnter)
          // @ts-ignore
          .transition(transition)
          // @ts-ignore
          .attr("transform", (d: { y: any; x: any; }) => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position
        node
          .exit()
          // @ts-ignore
          .transition(transition)
          .remove()
          .attr("transform", (d: any) => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

        // Update the links
        // @ts-ignore
        const link = gLink.selectAll("path").data(links, (d: { target: { id: any; }; }) => d.target.id);

        // Enter any new links at the parent's previous position
        const linkEnter = link
          .enter()
          .append("path")
          .attr("d", (d: any) => {
            const o = { x: source.x0, y: source.y0 };
            // @ts-ignore
            return diagonal({ source: o, target: o });
          });

          // @ts-ignore
        // Transition links to their new position
        link.merge(linkEnter).transition(transition).attr("d", diagonal);

        // Transition exiting nodes to the parent's new position
        link
          .exit()
          // @ts-ignore
          .transition(transition)
          .remove()
          .attr("d", (d: any) => {
            const o = { x: source.x, y: source.y };
            // @ts-ignore
            return diagonal({ source: o, target: o });
          });

        // Stash the old positions for transition
        // @ts-ignore
        root.eachBefore((d: { x0: any; x: any; y0: any; y: any; }) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

    })();
  }, []);

  const handleTechTreeClick = () => {
    router.push('tech.html');
  };

  return (
    <div className="container mx-auto">
      <p className="mb-4">
        Go to{' '}
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleTechTreeClick}
        >
          Tech Tree
        </button>
      </p>
      <div className="tree">
        <svg ref={treeRef} width="2000" height="1200"></svg>
      </div>
    </div>
  );
};

export default NeedsTree;
