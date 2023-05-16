import { useEffect, useState } from 'react';
import { CytoscapeLayout } from './GraphLayout';

interface GraphControlsProps {
  showSources?: boolean;
  layouts: CytoscapeLayout[];
  running?: boolean;
  onFit: () => void;
  onScreenshot: () => void;
  onBack: () => void;
  onRun: () => void;
  onLayout: (layout: CytoscapeLayout) => void;
  onShowSources: (show: boolean) => void;
  onSettings: () => void;
  onStop: () => void;
  onSearch: (term: string) => void;
  onSearchNext: (value: string) => void;
  onSearchPrevious: (value: string) => void;
}

const GraphControlsComponent: React.FC<GraphControlsProps> = ({
  showSources = false,
  layouts,
  running = false,
  onFit,
  onScreenshot,
  onBack,
  onRun,
  onLayout,
  onShowSources,
  onSettings,
  onStop,
  onSearch,
  onSearchNext,
  onSearchPrevious,
}) => {
  const [selectedLayout, setSelectedLayout] = useState<CytoscapeLayout>(layouts[0]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedLayout(layouts[0]);
    }, 0);

    return () => clearTimeout(timeout);
  }, [layouts]);

  const handleNext = (value: string) => {
    if (timeout) {
      return;
    } else {
      onSearchNext(value);
      const animationEnabled = false; // Replace with actual value from settings
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, animationEnabled ? 50 : 0);
    }
  };

  return (
    <div className="graph-controls border-1 border-primary-300 border-round-2xl p-3 surface-ground">
      <div className="flex flex-row gap-2 justify-content-between">
        <div>
          <button className="p-button p-button-secondary" onClick={onFit}>
            <i className="pi pi-arrows-alt"></i>
          </button>
        </div>
        <div className="graph-search">
          {/* Omitted form and input elements */}
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-content-between">
        <div className="flex">
          <button
            className="p-button p-button-secondary"
            onClick={onScreenshot}
          >
            <i className="pi pi-download"></i>
          </button>
        </div>

        <div className="flex w-full p-inputgroup">
          {/* Omitted dropdown and span elements */}
        </div>

        <div className="flex">
          <button
            className="p-button p-button-secondary"
            onClick={onSettings}
          >
            <i className="pi pi-cog"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphControlsComponent;
