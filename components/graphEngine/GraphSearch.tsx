import React, { useEffect, useState } from 'react';
import { GraphSearchResult } from './GraphSearchResult';
// import { Need } from './types/Need';
import { Need } from '@/types/Need';

interface SearchResult extends Need {
  index: number;
  score: number;
}

interface GraphSearchProps {
  sources: (SearchResult)[];
  footerText: string;
  selectedIndex: number;
  onResultClicked: (source: SearchResult) => void;
  onContextMenu: (data: { data: SearchResult[], event: React.MouseEvent }) => void;
  onNext: (previous?: boolean) => void;
}

const GraphSearch: React.FC<GraphSearchProps> = ({
  sources,
  footerText,
  selectedIndex,
  onResultClicked,
  onContextMenu,
  onNext,
}) => {
  const layoutOptions = [
    { icon: 'pi pi-tablet', minimal: false },
    { icon: 'pi pi-list', minimal: true },
  ];
  const [layout, setLayout] = useState(layoutOptions[0]);

  useEffect(() => {
    try {
      const minimal = JSON.parse(localStorage.getItem('graph-search-minimal') ?? '') ?? false;
      const selectedLayout = layoutOptions.find(l => l.minimal === minimal) ?? layoutOptions[0];
      setLayout(selectedLayout);
      onLayoutChange();
    } catch (error) {
      setLayout(layoutOptions[0]);
      onLayoutChange();
    }
  }, []);

  const onLayoutChange = () => {
    localStorage.setItem('graph-search-minimal', JSON.stringify(layout.minimal));
    scroll();
  };

  const scroll = (timeoutms = 100) => {
    let scrollArgs: any = { behavior: 'smooth' };
    if (!settings.app.graph.animation.enabled) {
      scrollArgs = {};
    }

    setTimeout(() => {
      const classElement = document.getElementsByClassName('active-source');
      if (classElement.length > 0) {
        classElement[0].scrollIntoView(scrollArgs);
      }
    }, timeoutms);
  };

  const onTopic = (event: { ks: SearchResult; topic: string }) => {
    // Handle topic event
    // ...
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onNext(true);
  };

  return (
    <div className="graph-search border-1 border-primary-300 border-round-2xl surface-ground p-1">
      <div
        className={`w-full overflow-y-auto bg-transparent ${
          layout.minimal ? 'graph-search-small' : 'graph-search-large'
        }`}
      >
        <div className="graph-search-header w-full flex flex-column justify-content-center align-items-end absolute p-2 z-2">
          <div className="surface-hover border-round-top-2xl">
            <select
              value={layout.icon}
              onChange={onLayoutChange}
              className="w-full p-selectButton flex"
            >
              {layoutOptions.map(option => (
                <option key={option.icon} value={option.icon}>
                  <i className={option.icon}></i>
                </option>
              ))}
            </select>
          </div>
        </div>
        {sources.map((source, index) => (
            <GraphSearchResult
            key={source.id}
            source={source}
            active={selectedIndex === index}
            onClick={() => onResultClicked(source)}
            onContextMenu={(event) => onContextMenu({ data: [source], event })}
            onTopicClick={(topic) => onTopic({ ks: source, topic })}
            />
        ))}
        </div>

        <div className="w-full text-center pb-1">
        {sources.length > 0 ? (
            <div className="w-full flex-row-center-between px-4 text-600">
            <div
                className="pi pi-arrow-left cursor-pointer"
                onClick={handlePrevious}
                title="Previous: ⌘/Ctrl+["
            ></div>
            <div
                className="pi pi-arrow-right cursor-pointer"
                onClick={handleNext}
                title="Next: ⌘/Ctrl+]"
            ></div>
            </div>
        ) : (
            <div>{footerText}</div>
        )}
        </div>
    </div>
    );
};

export default GraphSearch;
       