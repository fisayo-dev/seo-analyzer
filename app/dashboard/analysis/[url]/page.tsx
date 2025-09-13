import AnalysisDetails from "@/components/dashboard/AnalysisDetails";
import { fetchAnalysisDetails } from "@/lib/actions/analysis";

interface AnalysisResults {
  technical: any;
  content: any;
  onPage: any;
}

const Page = async ({ params }: { params: { url: string } }) => {
  const { url } = params;

  try {
    const data = await fetchAnalysisDetails(decodeURIComponent(url))
    const results: AnalysisResults = {
      technical: data?.technical,
      content: data?.content,
      onPage: data?.on_page,
    };

    return <AnalysisDetails results={results} />;
  } catch (err) {
    console.error("Error fetching analysis:", err);
    return <div>Error: {(err as Error).message ?? "An error occurred"}</div>;
  }
};

export default Page;
