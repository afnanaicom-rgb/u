import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarTrigger } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { 
  Wand2, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  X, 
  Send, 
  Maximize2, 
  MoreHorizontal, 
  Sparkles,
  RotateCw,
  Menu,
  Crown
} from "lucide-react";
import { toast } from "sonner";

// Mock Data
const TEMPLATES = [
  { id: 'cinematic', name: 'Cinematic', image: '/images/template-cinematic.jpg' },
  { id: 'neon', name: 'Neon', image: '/images/template-neon.jpg' },
  { id: 'cyberpunk', name: 'Cyberpunk', image: '/images/hero-bg.jpg' },
  { id: 'abstract', name: 'Abstract', image: '/images/sample-1.jpg' },
];

const MOCK_GALLERY = [
  { id: '1', url: '/images/hero-bg.jpg', height: 'h-64' },
  { id: '2', url: '/images/ai-avatar.jpg', height: 'h-48' },
  { id: '3', url: '/images/template-cinematic.jpg', height: 'h-56' },
  { id: '4', url: '/images/template-neon.jpg', height: 'h-72' },
  { id: '5', url: '/images/sample-1.jpg', height: 'h-52' },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<'image' | 'video' | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [prompt]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (uploadedImages.length + e.target.files.length > 5) {
        toast.error("يمكنك رفع 5 صور كحد أقصى");
        return;
      }
      
      const newImages: string[] = [];
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      
      setIsToolsMenuOpen(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Mock generation
    const newItem = {
      id: Date.now().toString(),
      type: mode || 'image',
      url: MOCK_GALLERY[Math.floor(Math.random() * MOCK_GALLERY.length)].url,
      prompt: prompt,
      timestamp: new Date()
    };

    setGeneratedItems([newItem, ...generatedItems]);
    setPrompt("");
    setMode(null);
    setUploadedImages([]);
    toast.success("تم بدء عملية التوليد بنجاح!");
    
    // Simulate completion
    setTimeout(() => {
      setIsSidebarOpen(true);
    }, 1500);
  };

  const toggleMode = (newMode: 'image' | 'video') => {
    if (newMode === 'video') {
      // Check for pro subscription (mock)
      // toast.info("ميزة الفيديو تتطلب اشتراك Pro");
    }
    setMode(newMode);
    setIsToolsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden selection:bg-primary/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-4 pt-6 bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-gray-300">
          <RotateCw className="w-5 h-5" />
        </Button>

        <div className="flex bg-black/40 border border-white/10 rounded-full p-1 relative backdrop-blur-md shadow-lg">
          <button className="px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 text-gray-400 hover:text-white">
            اسأل
          </button>
          <button className="px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 bg-white/10 text-white shadow-sm border border-white/5 neon-glow">
            تخيل
          </button>
        </div>

        <div className="w-10"></div> {/* Spacer for symmetry with SidebarTrigger */}
      </header>

      <SidebarTrigger isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <Sidebar 
        items={generatedItems} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onDeleteItem={(id) => setGeneratedItems(items => items.filter(i => i.id !== id))}
        onSelectItem={(item) => console.log(item)}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-40 px-4 max-w-5xl mx-auto h-screen overflow-y-auto hide-scrollbar">
        
        {/* Templates Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-gray-500 text-[10px] font-bold mb-4 px-2 tracking-widest uppercase opacity-80">قوالب مميزة</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-1">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id}
                className="min-w-[120px] h-[160px] rounded-2xl relative overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                onClick={() => {
                  setMode('image');
                  setPrompt(`أسلوب ${template.name}: `);
                }}
              >
                <img 
                  src={template.image} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-500 scale-100 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 text-[11px] font-bold text-white drop-shadow-md tracking-wide">{template.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {MOCK_GALLERY.map((item, i) => (
            <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden relative group border border-white/5 bg-white/5 hover:border-white/20 transition-all duration-300">
              <img src={item.url} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <Button variant="secondary" size="sm" className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
        <div className="max-w-3xl mx-auto relative">
          
          {/* Tools Menu Popover */}
          {isToolsMenuOpen && (
            <div className="absolute bottom-[80px] right-0 w-[260px] glass-card rounded-2xl p-2 flex flex-col gap-1 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200 origin-bottom-right">
              <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">اختر نوع الإنشاء</div>
              
              <button onClick={() => toggleMode('image')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-right group">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-white/5 shadow-inner">
                  <ImageIcon className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200">توليد صور</span>
                  <span className="text-[10px] text-gray-500">إنشاء صور من النص</span>
                </div>
              </button>

              <button onClick={() => toggleMode('video')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-right group relative overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-purple-600 transition-colors border border-white/5 shadow-inner">
                  <Video className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-200">توليد فيديو</span>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                      <Crown className="w-2 h-2" /> PRO
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">تحويل النص إلى فيديو</span>
                </div>
              </button>

              <div className="h-[1px] bg-white/5 my-1 mx-2"></div>

              <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-right group">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-green-600 transition-colors border border-white/5 shadow-inner">
                  <Upload className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200">رفع صور</span>
                  <span className="text-[10px] text-gray-500">استخدام صور كمرجع (حد أقصى 5)</span>
                </div>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleFileUpload} 
              />
            </div>
          )}

          {/* Input Bar */}
          <div className="glass rounded-[32px] p-2 flex items-end gap-3 relative transition-all duration-300 shadow-2xl shadow-black/50 border border-white/10">
            
            {/* Tools Button */}
            <button 
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)} 
              className={cn(
                "w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-white/10 transition text-gray-300 hover:text-white mb-1 group border border-transparent hover:border-white/10",
                isToolsMenuOpen && "bg-white/10 text-white rotate-45"
              )}
            >
              <MoreHorizontal className="w-6 h-6" />
            </button>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-center min-h-[56px] py-1.5">
              
              {/* Chips Area */}
              {(mode || uploadedImages.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
                  
                  {/* Mode Chip */}
                  {mode && (
                    <div className="px-3 py-1.5 rounded-full flex items-center gap-2 select-none bg-primary/10 border border-primary/30 text-primary-foreground">
                      {mode === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                      <span className="text-[11px] font-bold tracking-wide">{mode === 'image' ? 'توليد صور' : 'توليد فيديو'}</span>
                      <button onClick={() => setMode(null)} className="hover:bg-white/20 rounded-full p-0.5 ml-1 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Uploaded Images Chips */}
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                      <button 
                        onClick={() => setUploadedImages(imgs => imgs.filter((_, i) => i !== idx))}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <textarea 
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={1} 
                className="w-full bg-transparent text-white placeholder-gray-500 text-right px-2 outline-none resize-none text-base leading-relaxed font-medium" 
                placeholder={mode === 'image' ? "صف تفاصيل الصورة..." : mode === 'video' ? "صف مشهد الفيديو..." : "ما الذي يدور في ذهنك؟"}
              />
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0 w-12 h-12 mb-1 relative">
              <button 
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className={cn(
                  "absolute inset-0 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 border border-white/10",
                  prompt.trim() 
                    ? "bg-white text-black scale-100 rotate-0 opacity-100 hover:scale-105" 
                    : "bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 text-white scale-100 rotate-0 opacity-100 hover:shadow-blue-500/30"
                )}
              >
                {prompt.trim() ? (
                  <Send className="w-5 h-5 ml-0.5" />
                ) : (
                  <Sparkles className="w-5 h-5 animate-pulse" />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Overlay for Tools Menu */}
      {isToolsMenuOpen && (
        <div className="fixed inset-0 z-10 bg-transparent" onClick={() => setIsToolsMenuOpen(false)} />
      )}
    </div>
  );
}
