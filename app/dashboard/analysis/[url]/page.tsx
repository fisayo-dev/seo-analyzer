import AnalysisDetails from "@/components/dashboard/AnalysisDetails";
import { fetchAnalysisDetails } from "@/lib/actions/analysis";

interface AnalysisResults {
  technical: unknown;
  content: unknown;
  onPage: unknown;
  [key: string]: unknown;
}

const Page = async ({ params }: { params: { url: string } }) => {
  const { url } = await params;

  try {
    const data = await fetchAnalysisDetails(decodeURIComponent(url))
    const results: AnalysisResults = {
      technical: data?.technical,
      content: data?.content,
      onPage: data?.on_page,
      url: data?.url,
      title: data?.title
    };

    return <AnalysisDetails results={results} />;
  } catch (err) {
    console.error("Error fetching analysis:", err);
    return <div>Error: {(err as Error).message ?? "An error occurred"}</div>;
  }
};

export default Page;
