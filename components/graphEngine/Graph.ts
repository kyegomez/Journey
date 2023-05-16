// src/components/Graph.tsx
import React, { useEffect, useRef, useState } from "react";
import { createGraph } from "../workers/graph.worker";
import GraphCanvas from "./GraphCanvas";
import { ContextMenu, MenuItem } from "primeng/contextmenu";
import { ProjectService } from "../services/ProjectService";
import { SettingsService } from "../services/SettingsService";
import { NotificationService } from "../services/NotificationService";

interface GraphProps {
  projectId: string;
}

const Graph: React.FC<GraphProps> = ({ projectId }) => {
  const [data, setData] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const cm = useRef<any>(null);

  const projectService = new ProjectService();
  const settingsService = new SettingsService();
  const notificationService = new NotificationService();

  useEffect(() => {
    if (!projectId) {
      notificationService.error(
        "Graph",
        "Invalid Project ID",
        "No Project ID provided."
      );
      return;
    }

    // ...rest of the code from the build method...

  }, [projectId]);

  // ...rest of the methods from the Angular component...

  return (
    <div className="h-full w-full flex flex-row flex-nowrap justify-between">
      <GraphCanvas
        data={data}
        onRunning={(running: boolean) => {}}
        onSourceTap={(event: any) => {}}
        onSourceDblTap={(event: any) => {}}
        onSourceCtxtap={(event: any) => {}}
        onProjectTap={(event: any) => {}}
        onProjectCtxtap={(event: any) => {}}
        className="w-full h-full"
      />
      <ContextMenu
        ref={cm}
        styleClass="shadow-7"
        model={menuItems}
        baseZIndex={999999}
        autoZIndex
        appendTo="body"
      />
    </div>
  );
};

export default Graph;
