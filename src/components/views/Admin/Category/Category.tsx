import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./addCategoryModal";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    currentLimit,
    currentPage,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,

    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
  } = useCategory();

  const addCategoryModal = useDisclosure()

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category.id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger-500">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingCategory || isRefetchingCategory}
          emptyContent="No category found"
          renderCell={renderCell}
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          buttonTopContentLabel="Add Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          currentPage={Number(currentPage)}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          totalPages={dataCategory?.pagination.totalPages || 1}
        ></DataTable>
      )}
      <AddCategoryModal {...addCategoryModal} 
        refetchCategory={refetchCategory}/>
    </section>
  );
};

export default Category;
