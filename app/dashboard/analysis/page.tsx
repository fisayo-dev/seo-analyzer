import AllUserAnalysis from "@/components/dashboard/AllUserAnalysis";
import { fetchUserAnalysis }  from "@/lib/actions/analysis";

const Page = async () => {
  try {
    const data = await fetchUserAnalysis()

    return <AllUserAnalysis analysis={data} />;
  } catch (err) {
    console.error("Error fetching analysis:", err);
    return <div>Error: {(err as Error).message ?? "An error occurred"}</div>;
  }
};

export default Page;
