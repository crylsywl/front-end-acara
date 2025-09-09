import { Tab, Tabs } from "@heroui/react";
import useDetailCategory from "./useDetailCategory";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";

const DetailCategory = () => {
  const {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          current={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
