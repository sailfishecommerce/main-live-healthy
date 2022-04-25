import TabList from '@/components/Tabs/TabList'

interface Props {
  onClickHandler: (tabIndex: number) => void
  tab: number
}

export default function TabHeader({ onClickHandler, tab }: Props) {
  return (
    <ul
      className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
      id="tabs-tabFill"
    >
      <TabList
        id="signin"
        tab={tab}
        text="Sign in"
        index={0}
        onClick={onClickHandler}
      />
      <TabList
        id="signup"
        tab={tab}
        text="Sign up"
        index={1}
        onClick={onClickHandler}
      />
    </ul>
  )
}
