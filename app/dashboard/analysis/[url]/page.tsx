import AnalysisDetails, { SEOAnalysisResult } from "@/components/dashboard/AnalysisDetails";
import { fetchAnalysisDetails } from "@/lib/actions/analysis";
import  AnalysisNotFound from "@/components/dashboard/AnalysisNotFound";


const Page = async ({ params }: { params: { url: string } }) => {
  const { url } = await params;

  try {
    const data = await fetchAnalysisDetails(decodeURIComponent(url))
    const results: SEOAnalysisResult = {
      technical: data?.technical ?? "",
      content: data?.content ?? "",
      on_page: data?.on_page ?? "",
      url: data?.url ?? "",
      title: data?.title,
      id: data?.id
    };
    return data ?  <AnalysisDetails results={results} /> : <AnalysisNotFound />;
  } catch (err) {
    return <div>Error: {(err as Error).message ?? "An error occurred"}</div>;
  }
};

export default Page;
