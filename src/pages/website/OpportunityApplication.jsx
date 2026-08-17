import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const initialForm = { name: "", email: "", phone: "", location: "", experience: "" };

const OpportunityApplication = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [cv, setCv] = useState(null);
  const cvInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) throw new Error("This opportunity is no longer available.");
        setJob(await response.json());
      } catch (error) {
        setStatus({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleCvChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", message: "Upload a PDF, DOC, or DOCX CV no larger than 5 MB." });
      event.target.value = "";
      return;
    }
    setCv(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cv) return setStatus({ type: "error", message: "Please upload your CV before sending the application." });
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('location', form.location);
      formData.append('experience', form.experience);
      formData.append('opportunity', job.title);
      formData.append('opportunityId', job.id);
      formData.append('cv', cv);
      const response = await fetch('/api/public/job-applications', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send your application.");
      setStatus({ type: "success", message: "Your application has been sent to the Satesoft team." });
      setForm(initialForm);
      setCv(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <section className="flex min-h-screen items-center justify-center bg-gray-50"><p className="text-gray-600">Loading application form...</p></section>;
  if (!job) return <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 text-center"><div><p className="mb-5 text-gray-600">{status.message}</p><Link to="/opportunities" className="text-[#72bf24]">Back to opportunities</Link></div></section>;

  return (
    <section className="min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link to={`/opportunities/${job.id}`} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#72bf24] hover:text-[#62a71e]"><i className="bi bi-arrow-left"></i> Back to opportunity</Link>
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="bg-[#F5F5F5] px-8 py-10 text-gray-900">
            <div className="mb-4 h-1 w-16 rounded-full bg-[#72bf24]"></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Application</p>
            <h1 className="mt-2 text-3xl font-medium">Apply for {job.title}</h1>
            {job.location && <p className="mt-3 text-gray-600"><i className="bi bi-geo-alt mr-2"></i>{job.location}</p>}
          </div>
          <div className="p-8 md:p-10">
            {status.message && <div className={`mb-6 rounded-xl border p-4 text-sm ${status.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>{status.message}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" value={form.name} onChange={handleChange} required /><Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} required /><Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} required /><Field label="Current location" name="location" value={form.location} onChange={handleChange} required /></div>
               <div><label className="mb-1.5 block text-sm font-medium text-gray-700">Years of experience <span className="text-red-500">*</span></label><select name="experience" value={form.experience} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#72bf24]"><option value="">Select experience</option><option>0–1 years</option><option>2–3 years</option><option>4–5 years</option><option>5+ years</option></select></div>
               <div><label className="mb-1.5 block text-sm font-medium text-gray-700">Upload CV <span className="text-red-500">*</span></label><input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleCvChange} required className="block w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#72bf24]/10 file:px-4 file:py-3 file:font-semibold file:text-[#72bf24] hover:file:bg-[#72bf24]/20" /><p className="mt-2 text-xs text-gray-500">PDF, DOC, or DOCX — maximum 5 MB.{cv && ` Selected: ${cv.name}`}</p></div>
              <button disabled={submitting} className="w-full rounded-xl bg-[#72bf24] py-3.5 font-semibold text-white transition-colors hover:bg-[#62a71e] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Sending application..." : "Send application"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", value, onChange, required }) => <div><label className="mb-1.5 block text-sm font-medium text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label><input type={type} name={name} value={value} onChange={onChange} required={required} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#72bf24]" /></div>;
export default OpportunityApplication;
