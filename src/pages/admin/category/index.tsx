import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout title="Category" description="Category" type="admin">
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
