import Dropdown from "@/components/dropdown";
import DropdownItem from "@/components/dropdown/DropdownItem";

export default function ProductTabDropdown() {
  const tabs = ["Special Products", "Featured Products"];
  function selectedTabHandler(e: any) {
    e.preventDefault();
    console.log("e", e);
  }
  return (
    <Dropdown className="bg-transparent text-lg text-black border-none shadow-none" dropdownText="New Products">
      {tabs.map((tab, index) => (
        <DropdownItem onClick={selectedTabHandler} key={index}>
          {tab}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
