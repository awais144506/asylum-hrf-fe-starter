import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import { decodeBase64 } from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; 
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10);
  };

  const handleReadMore = () => {
    window.open('https://www.humanrightsfirst.org', '_blank');
  };

  return (
    <div className="flex-c w-[100vw] secondary-c">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center bg-[#666555] py-16 text-white px-4">
        <h1 className="text-5xl mb-4 text-center">Asylum Office Grant Rate Tracker</h1>
        <p className="text-xl max-w-4xl text-center">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions
        </p>
      </div>

      {/* Main Content - Graphs Section */}
      <div className="flex flex-col items-center py-20 px-4">
        <div className="flex flex-wrap justify-center gap-20 mb-12">
          <div className="flex flex-col items-center max-w-xs">
            <img src={barGraph} alt="Search Grant Rates By Office" className="h-64 object-contain mb-6 rounded-2xl" />
            <h3 className="text-2xl font-semibold">Search Grant Rates By Office</h3>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <img src={pieChart} alt="Search Grant Rates By Nationality" className="h-64 object-contain mb-6 rounded-2xl" />
            <h3 className="text-2xl font-semibold">Search Grant Rates By Nationality</h3>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <img src={lineGraph} alt="Search Grant Rates Over Time" className="h-64 object-contain mb-6 rounded-2xl" />
            <h3 className="text-2xl font-semibold">Search Grant Rates Over Time</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/graphs')}
            className="bg-[#666555] text-white px-6 py-2 font-semibold hover:bg-[#555444] transition-colors"
          >
            View the Data
          </button>
          <button
            onClick={() => downloadCSV()}
            className="bg-[#666555] text-white px-6 py-2 font-semibold hover:bg-[#555444] transition-colors"
          >
            Download the Data
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-wrap items-center justify-center py-20 px-10 gap-20">
        <img src={paperStack} alt="HRF Paper Stacks" className="w-[600px] h-[400px] object-cover rounded-3xl" />
        <div className="max-w-xl">
          <p className="text-xl leading-relaxed">
            Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
          </p>
        </div>
      </div>

      {/* Systemic Disparity Insights Section */}
      <div className="flex flex-col items-center py-20 px-4">
        <h2 className="text-4xl mb-16">Systemic Disparity Insights</h2>
        <div className="flex flex-wrap justify-center gap-20 mb-16 max-w-7xl">
          <div className="flex flex-col items-center max-w-sm text-center">
            <h4 className="text-5xl mb-6">36%</h4>
            <p className="text-lg">
              By the end of the Trump administration, the average asylum office grant rate had fallen 36% from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 2020.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-sm text-center">
            <h4 className="text-5xl mb-6">5%</h4>
            <p className="text-lg">
              The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-sm text-center">
            <h4 className="text-5xl mb-6">6x Lower</h4>
            <p className="text-lg">
              Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was 6 times lower than the San Francisco asylum office.
            </p>
          </div>
        </div>
        <button
          onClick={handleReadMore}
          className="bg-[#666555] text-white px-8 py-2 font-semibold hover:bg-[#555444] transition-colors mb-20"
        >
          Read More
        </button>

        <button
          onClick={scrollToTop}
          className="text-lg font-semibold hover:underline"
        >
          Back To Top ^
        </button>
      </div>

      <div className="mt-10 py-4 opacity-50">{'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}</div>
    </div>
  );
};
