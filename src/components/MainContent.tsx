import { TabType } from "../App";
import { OrganizationTab } from "./tabs/OrganizationTab";
import { ExperimentsTab } from "./tabs/ExperimentsTab";
import { DocumentationTab } from "./tabs/DocumentationTab";
import { DatasetsTab } from "./tabs/DatasetsTab";
import { DiscussionsTab } from "./tabs/DiscussionsTab";
import { RetrospectTab } from "./tabs/RetrospectTab";
import { SettingsTab } from "./tabs/SettingsTab";

interface MainContentProps {
  activeTab: TabType;
}

export function MainContent({ activeTab }: MainContentProps) {
  const components = {
    organization: OrganizationTab,
    experiments: ExperimentsTab,
    documentation: DocumentationTab,
    datasets: DatasetsTab,
    discussions: DiscussionsTab,
    retrospect: RetrospectTab,
    settings: SettingsTab,
  };

  const Component = components[activeTab];
  return <Component />;
}
