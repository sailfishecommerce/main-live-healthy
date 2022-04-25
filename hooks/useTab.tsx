import { useState } from "react";

export default function useTab() {
  const [tab, setTab] = useState(0);

  const onTabChange = (tabIndex: number) => setTab(tabIndex);
  return [tab, onTabChange];
}
