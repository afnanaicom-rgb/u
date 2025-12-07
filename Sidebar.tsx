import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Image, Video, Clock, Trash2, Download, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface GeneratedItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  timestamp: Date;
}

interface SidebarProps {
  items: GeneratedItem[];
  isOpen: boolean;
  onToggle: () => void;
  onDeleteItem: (id: string) => void;
  onSelectItem: (item: GeneratedItem) => void;
}

export function Sidebar({ items, isOpen, onToggle, onDeleteItem, onSelectItem }: SidebarProps) {
  return (
    <div 
      className={cn(
        "fixed top-0 right-0 h-full z-40 transition-all duration-300 ease-in-out glass border-l border-white/10 flex flex-col",
        isOpen ? "w-80 translate-x-0" : "w-0 translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>السجل</span>
        </h2>
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 text-gray-400 hover:text-white">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center">
            <Image className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">لا توجد عناصر منشأة بعد</p>
            <p className="text-xs mt-1 opacity-60">ابدأ بإنشاء صور أو فيديوهات لتظهر هنا</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-xl overflow-hidden border border-white/5 bg-black/40 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => onSelectItem(item)}
              >
                <div className="aspect-video w-full relative overflow-hidden">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.prompt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                      <img 
                        src={item.url} // Assuming thumbnail for video or using the video itself
                        alt={item.prompt}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Video className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white border border-white/10 flex items-center gap-1">
                    {item.type === 'image' ? <Image className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    <span>{item.type === 'image' ? 'صورة' : 'فيديو'}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <p className="text-xs text-gray-300 line-clamp-2 mb-2 font-light leading-relaxed">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500">
                      {item.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 rounded-full hover:bg-white/10 hover:text-white text-gray-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Download logic would go here
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 rounded-full hover:bg-red-500/20 hover:text-red-400 text-gray-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export function SidebarTrigger({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        "fixed top-6 right-4 z-50 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300",
        isOpen ? "opacity-0 pointer-events-none translate-x-10" : "opacity-100 translate-x-0"
      )}
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
}
