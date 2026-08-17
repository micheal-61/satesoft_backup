import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OpportunityDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) throw new Error(response.status === 404 ? "This opportunity is no longer available." : "Unable to load this opportunity.");
        setJob(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <section className="flex min-h-screen items-center justify-center bg-gray-50"><p className="text-gray-600">Loading opportunity...</p></section>;
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 text-center">
        <div>
          <h1 className="mb-3 text-2xl font-semibold text-gray-900">Opportunity unavailable</h1>
          <p className="mb-6 text-gray-600">{error}</p>
          <Link to="/opportunities" className="rounded-lg bg-[#72bf24] px-5 py-3 font-medium text-white">Back to opportunities</Link>
        </div>
      </section>
    );
  }

  const requirements = job.keyRequirements?.split('\n').map((item) => item.trim()).filter(Boolean) || [];

  return (
    <section className="min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Link to="/opportunities" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#72bf24] hover:text-[#62a71e]">
          <i className="bi bi-arrow-left"></i> Back to opportunities
        </Link>

        <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <header className="bg-[#F5F5F5] px-8 py-12 text-gray-900 md:px-12">
            <div className="mb-5 h-1 w-16 rounded-full bg-[#72bf24]"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Opportunity</p>
            <h1 className="mt-2 max-w-3xl text-3xl font-medium leading-tight md:text-5xl">{job.title}</h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-600">
              {job.location && <span><i className="bi bi-geo-alt mr-2"></i>{job.location}</span>}
              <span><i className="bi bi-people mr-2"></i>{job.applications !== undefined ? `${job.applications} positions available` : 'Open position'}</span>
            </div>
          </header>

          <div className="grid gap-10 p-8 md:grid-cols-[1fr_280px] md:p-12">
            <div className="space-y-9">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">About this opportunity</h2>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">{job.description || 'More details about this opportunity will be shared with shortlisted candidates.'}</p>
              </div>
              {requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">Key requirements</h2>
                  <ul className="mt-4 space-y-3">
                    {requirements.map((requirement, index) => <li key={index} className="flex gap-3 text-gray-600"><i className="bi bi-check-circle-fill mt-1 text-[#72bf24]"></i><span>{requirement}</span></li>)}
                  </ul>
                </div>
              )}
            </div>
            <aside className="h-fit rounded-2xl bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Interested?</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Contact our team to express interest in this opportunity.</p>
              <Link to={`/opportunities/${job.id}/apply`} className="mt-5 block rounded-xl bg-[#72bf24] px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-[#62a71e]">Apply now</Link>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
};

export default OpportunityDetails;
