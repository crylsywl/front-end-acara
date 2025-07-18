import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authService from "@/services/auth.service";

interface PropsTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropsTypes) => {
  return (
    <AuthLayout title="Acara | Activation">
      <Activation {...props} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authService.activation({ code: context.query.code });
    console.log(result.data.data);
    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        status: "failed",
      },
    };
  }
}

export default ActivationPage;
