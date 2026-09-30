import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  presetImages?: Array<{ label: string; url: string }>;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image',
  placeholder = 'e.g. /images/profile.png or upload a file',
  presetImages = [],
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image if too large for localStorage
  const processAndSetFile = (file: File) => {
    setErrorMsg('');
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    // Max file size 5MB before compression
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image file size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // If image > 800KB, resize via canvas to ensure localStorage limits are respected
      if (file.size > 800 * 1024) {
        const img = new Image();
        img.src = result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            onChange(compressedDataUrl);
          } else {
            onChange(result);
          }
        };
      } else {
        onChange(result);
      }
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read image file.');
    };

    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#27D6D9]">
          {label}
        </label>

        {/* Tab Toggle */}
        <div className="flex bg-[#000000] p-0.5 rounded-lg border border-[#2A2A2A] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 ${activeTab === 'upload'
                ? 'bg-[#F0444B] text-white shadow'
                : 'text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
          >
            <Upload className="w-3 h-3" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 ${activeTab === 'url'
                ? 'bg-[#F0444B] text-white shadow'
                : 'text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL / Path
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#050505] border border-[#2A2A2A] rounded-xl p-3 space-y-3">
        {/* Upload Mode */}
        {activeTab === 'upload' ? (
          <div>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${dragActive
                  ? 'border-[#F0444B] bg-[#1B1B1B]'
                  : 'border-[#2A2A2A] hover:border-[#F0444B] bg-[#000000]'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-1.5 text-xs text-[#BDBDBD]">
                <div className="w-9 h-9 rounded-full bg-[#050505] flex items-center justify-center text-[#F0444B] mb-1 border border-[#2A2A2A]">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="font-semibold text-white">
                  Click to choose file or drag & drop here
                </p>
                <p className="text-[11px] text-[#777777]">
                  PNG, JPG, WEBP, or SVG (Up to 5MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* URL / Path Mode */
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none transition-colors"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#777777]">
              💡 Tip: Put image files in <code className="text-[#27D6D9]">public/images/</code> and enter path as <code className="text-[#27D6D9]">/images/filename.jpg</code>
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-900/30 p-2 rounded-lg border border-red-500/30">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Presets if provided */}
        {presetImages.length > 0 && (
          <div>
            <span className="block text-[11px] font-semibold text-[#27D6D9] mb-1.5">
              Or Choose Preset:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetImages.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all flex items-center gap-1 ${value === preset.url
                      ? 'bg-[#F0444B] text-white font-bold border-[#F0444B]'
                      : 'bg-[#000000] border-[#2A2A2A] text-[#BDBDBD] hover:border-[#F0444B]'
                    }`}
                >
                  {value === preset.url && <Check className="w-3 h-3" />}
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview Section */}
        {value && (
          <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-[#000000] overflow-hidden border border-[#2A2A2A] shrink-0 flex items-center justify-center">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <ImageIcon className="w-5 h-5 text-gray-400 -z-10" />
              </div>
              <div className="min-w-0 text-xs">
                <span className="font-semibold text-white block truncate">Image Selected</span>
                <span className="text-[10px] text-[#777777] block truncate max-w-[200px]">
                  {value.startsWith('data:') ? 'Base64 Uploaded File' : value}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs px-2 py-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

