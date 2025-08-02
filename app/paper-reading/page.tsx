import AnimatedPaperList from "@/components/animated-paper-list";
import PaginationControls from "@/components/pagination-controls";
import { fetchArxivPapers, getManualPapers } from "@/lib/arxiv";
import { Paper } from "@/types/paper";

export default async function PaperReadingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const arxivPapers = await fetchArxivPapers([
    
    "1706.03762",
    "1301.3781",
    "1406.1078",
    "1409.0575",
    "1409.1556",
    "1411.4038",
    "1412.6980",
    "1505.04597",
    "1512.03385",
    "1603.02754",
    "2005.14165",
    "2005.11401",
    "2201.11903",
    "2203.11171",
    "2208.03274",
    "2210.03629",
    "2212.08073",
    "2302.09664",
    "2306.05499",
    "2307.09705",
    "2308.03825",
    "2308.13387",
    "2308.14132",
    "2309.00614",
    "2309.08448",
    "2310.00905",
    "2310.02446",
    "2310.03684",
    "2310.03693",
    "2310.05818",
    "2310.06474",
    "2310.08419",
    "2311.00172",
    "2311.07689",
    "2311.11509",
    "2311.17487",
    "2312.06674",
    "2312.10997",
    "2401.10019",
    "2401.13136",
    "2401.17256",
    "2402.02207",
    "2402.04249",
    "2402.05044",
    "2402.05668",
    "2402.16192",
    "2402.16822",
    "2403.03893",
    "2403.04783",
    "2403.04786",
    "2403.13031",
    "2403.14720",
    "2404.05993",
    "2404.07242",
    "2404.19543",
    "2405.16833",
    "2405.19795",
    "2405.20770",
    "2406.05946",
    "2406.10311",
    "2406.18510",
    "2407.07342",
    "2407.10264",
    "2407.12858",
    "2407.21534",
    "2407.21772",
    "2409.13331",
    "2410.16222",
    "2410.21146",
    "2410.22284",
    "2411.16508",
    "2412.12591",
    "2412.13435",
    "2412.15035",
    "2501.15145",
    "2502.16174",
    "2502.19041",
    "2503.05731",
    "2503.11517",
    "2503.21464",
    "2503.22115",
    "2504.01081",
  ]);
  const manualPapers = await getManualPapers();

  const allPapers: Paper[] = [...arxivPapers, ...manualPapers].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const page = searchParams["page"] ?? "1";
  const currentPage = Number(page);
  const papersPerPage = 15;

  const paginatedPapers = allPapers.slice(
    (currentPage - 1) * papersPerPage,
    currentPage * papersPerPage
  );

  const hasPrevPage = currentPage > 1;
  const hasNextPage = allPapers.length > currentPage * papersPerPage;

  return (
    <div className="page-transition-enter">
      <div className="container mx-auto px-4 py-8">
        <AnimatedPaperList papers={paginatedPapers} />
        <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
      </div>
    </div>
  );
}
