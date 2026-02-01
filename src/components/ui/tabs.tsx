import type { TabsProps as TabsPropsBase } from 'antd';
import { Tabs as TabsBase } from 'antd';

export interface TabsProps extends TabsPropsBase {

}

function TabsRoot(props: TabsProps) {
  return <TabsBase {...props} />;
}

export const Tabs = Object.assign(TabsRoot, {
  TabPane: TabsBase.TabPane,
});
