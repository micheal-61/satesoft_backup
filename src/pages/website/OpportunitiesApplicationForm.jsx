import React from "react";

const ApplicationForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-2xl w-full max-w-3xl shadow-2xl relative my-8 flex flex-col max-h-[90vh]">

        {/* Header - Fixed */}
        <div className="flex justify-between items-start p-6 sm:p-8 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Secure Application Form</h2>
            <p className="text-text/70">
              Your data is encrypted and handled with care.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text/50 hover:text-text hover:bg-bg rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Sex */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Sex
                </label>
                <select className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="+254 700 000 000"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Years of Experience
                </label>
                <select className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]">
                  <option>Select Experience</option>
                  <option>0-1 Years</option>
                  <option>2-3 Years</option>
                  <option>4-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Availability (Notice Period)
                </label>
                <select className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]">
                  <option>Select</option>
                  <option>Immediately</option>
                  <option>2 Weeks</option>
                  <option>1 Month</option>
                  <option>2 Months</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Current Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Kampala, Uganda"
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Position Applying For
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Software Engineer"
                />
              </div>

              {/* Cover Letter */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Cover Letter
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y"
                  rows="5"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              {/* Resume */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-text uppercase tracking-wider">
                  Upload Resume
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors group cursor-pointer relative">
                  <div className="space-y-2 text-center">
                    <svg className="mx-auto h-12 w-12 text-text/40 group-hover:text-primary-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-text/70 justify-center">
                      <span className="relative rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-text/50">
                      PDF, DOCX up to 10MB
                    </p>
                  </div>
                  {/* Invisible input to cover the whole dropzone area */}
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 sm:p-8 border-t border-border flex justify-end gap-4 bg-surface rounded-b-2xl flex-shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 border border-border text-text font-medium rounded-xl hover:bg-bg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-md shadow-primary-500/30 transition-all hover:-translate-y-0.5"
          >
            Submit Application
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplicationForm;