import { useState } from "react";
import { 
  FileIcon, 
  XIcon, 
  ChevronDownIcon,
  VerifiedIcon,
  BookIcon,
  CheckCircle2Icon,
  SettingsIcon
} from 'lucide-react';

function App() {
  const [sourceVerificationResponse, setSourceVerificationResponse] =
    useState("");
  const [detailVerificationResponse, setDetailVerificationResponse] =
    useState("");
  const [factualAccuracyResponse, setFactualAccuracyResponse] = useState("");
  const [technicalVerificationResponse, setTechnicalVerificationResponse] =
    useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [expandedVerification, setExpandedVerification] = useState(null);
  const [activeVerification, setActiveVerification] = useState(null);

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const toggleExpand = (type) => {
    setExpandedVerification((prev) => (prev === type ? null : type));
  };

  const handleVerificationRequest = (type, responseText) => {
    setActiveVerification(type);
    switch (type) {
      case "source":
        setSourceVerificationResponse(responseText);
        break;
      case "detail":
        setDetailVerificationResponse(responseText);
        break;
      case "factual":
        setFactualAccuracyResponse(responseText);
        break;
      case "technical":
        setTechnicalVerificationResponse(responseText);
        break;
      default:
        break;
    }
  };

  const verificationTypes = [
    {
      type: "source",
      label: "Source Verification",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      Icon: VerifiedIcon,
      response: "Source verification results will be displayed here",
    },
    {
      type: "detail",
      label: "Detail Verification",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      Icon: BookIcon,
      response: "Detail verification results will be displayed here",
    },
    {
      type: "factual",
      label: "Factual Accuracy",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      Icon: CheckCircle2Icon,
      response: "Factual accuracy verification results will be displayed here",
    },
    {
      type: "technical",
      label: "Technical Verification",
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
      Icon: SettingsIcon,
      response: "Technical verification results will be displayed here",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900  sm:tracking-tight lg:text-4xl">
            Fact Checker , Sources and Detail Verification
          </h1>
          <p className="mt-5 text-base text-gray-500">
            This tool is designed to guide you in refining article details,
            verifying sources, ensuring factual accuracy, and verifying
            technical details if applicable. While it can help enhance your
            content, it should be viewed as a supportive resource, not a
            substitute for thorough research and critical thinking. Use it to
            identify areas for improvement, but always ensure that your final
            work is backed by credible, well-researched information. Rely on
            your own judgment and make sure that every claim in your content,
            including technical details, can be confidently accounted for.
            High-quality content comes from a balance of diligence and informed
            use of this tool.
          </p>
        </div>

        {/* File Uploader */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <div
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
              ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              className="hidden"
              id="fileUpload"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FileIcon className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                Drag and drop files here, or
                <span className="text-indigo-600 ml-2 hover:underline">
                  click to select files
                </span>
              </p>
            </label>
          </div>

          {/* File Preview */}
          {uploadedFiles.length > 0 && (
            <div className="">
              {uploadedFiles.map((fileItem, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg shadow-sm p-4 flex items-center space-x-4"
                >
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileItem.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(fileItem.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(fileItem.name)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification Section */}
        <div className="space-y-4">
          {verificationTypes.map((verification) => (
            <div
              key={verification.type}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex">
                {/* Verification Request Button */}
                <button
                  onClick={() =>
                    handleVerificationRequest(
                      verification.type,
                      verification.response
                    )
                  }
                  className={`
                    w-full py-4 px-6 flex items-center justify-between 
                    bg-gradient-to-r ${verification.gradient} 
                    text-white font-semibold transition-all duration-300
                    hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-${verification.color}-500
                    ${
                      activeVerification === verification.type
                        ? "opacity-75"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-6 h-6">
                      <verification.Icon size={24} />
                    </span>
                    <span>{verification.label}</span>
                  </div>
                </button>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleExpand(verification.type)}
                  className={`
                    px-4 bg-gray-100 text-gray-600 hover:bg-gray-200
                    transition-all duration-300
                    ${
                      expandedVerification === verification.type
                        ? "rotate-180"
                        : ""
                    }
                  `}
                >
                  <ChevronDownIcon />
                </button>
              </div>

              {/* Expandable Div */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${
                    expandedVerification === verification.type
                      ? "max-h-96 opacity-100 p-6"
                      : "max-h-0 opacity-0 p-0"
                  }
                  bg-white
                `}
              >
                <p className="text-gray-700 text-base leading-relaxed">
                  {verification.type === "source" && sourceVerificationResponse}
                  {verification.type === "detail" && detailVerificationResponse}
                  {verification.type === "factual" && factualAccuracyResponse}
                  {verification.type === "technical" &&
                    technicalVerificationResponse}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
