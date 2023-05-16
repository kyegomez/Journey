import { LayoutOptions } from 'cytoscape';

export interface CytoscapeLayout {
  name: string;
  code: string;
  options: LayoutOptions;
}

export class GraphLayouts {
  commonOptions: Partial<
    LayoutOptions & { simulate: boolean; maxSimulationTime: number }
  > = {
    animate: true,
    animationDuration: 500,
    fit: false,
    nodeDimensionsIncludeLabels: true,
    padding: 30,
    simulate: true,
    maxSimulationTime: 5000,
  };
  layouts: CytoscapeLayout[] = [];

  constructor(common?: Partial<LayoutOptions>) {
    this.commonOptions = common ?? this.commonOptions;
    this.setLayouts();
  }

  setLayouts() {
    this.layouts = [
      {
        name: 'Centered',
        code: 'fcose',
        options: {
          ...this.commonOptions,
          name: 'fcose',
          padding: 20,
          componentSpacing: 1.2,
          nodeSeparation: 100,
          uniformNodeDimensions: true,
          sampleSize: 100,
          spacingFactor: 1,
          nodeDimensionsIncludeLabels: true,
          initialTemp: 99999,
          gravity: 50,
          idealEdgeLength: () => 100,
          nodeRepulsion(): number {
            return 999999;
          },
        },
      },
      {
        name: 'Hierarchical',
        code: 'klay',
        options: {
          ...this.commonOptions,
          name: 'klay',
          klay: {},
        },
      },
      {
        name: 'Directed',
        code: 'dagre',
        options: {
          ...this.commonOptions,
          name: 'dagre',
        },
      },
      {
        name: 'Breadth-first',
        code: 'breadthfirst',
        options: {
          ...this.commonOptions,
          name: 'breadthfirst',
          fit: true,
          directed: true,
          padding: 30,
          circle: false,
          grid: true,
          spacingFactor: 1.75,
          boundingBox: undefined,
          avoidOverlap: true,
          nodeDimensionsIncludeLabels: false,
          roots: undefined,
          maximal: true,
          depthSort: undefined,
          animationEasing: undefined,
          animateFilter: () => true,
          ready: undefined,
          stop: undefined,
        },
      },
      {
        name: 'Circular',
        code: 'circle',
        options: {
          ...this.commonOptions,
          name: 'circle',
        },
      },
      {
        name: 'Concentric',
        code: 'concentric',
        options: {
          ...this.commonOptions,
          name: 'concentric',
        },
      },
      {
        name: 'Simulate',
        code: 'cola',
        options: {
          ...this.commonOptions,
          name: 'cola',
          animate: true,
          refresh: 2,
          ungrabifyWhileSimulating: false,
          fit: false,
          padding: 30,
          boundingBox: undefined,
          randomize: false,
          avoidOverlap: true,
          handleDisconnected: true,
          convergenceThreshold: 0.01,
          nodeSpacing: () => 10,
          flow: undefined,
          alignment: undefined,
          gapInequalities: undefined,
          centerGraph: false,
          edgeLength: undefined,
          edgeSymDiffLength: undefined,
          edgeJaccardLength: undefined,
          unconstrIter: undefined,
          userConstIter: undefined,
          allConstIter: undefined,
          infinite: false,
        },
      },
    ];
  }
}
