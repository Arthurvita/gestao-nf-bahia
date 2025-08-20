import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Faturamento from "./pages/Faturamento";
import Tributos from "./pages/Tributos";
import NotasFiscais from "./pages/NotasFiscais";
import Indicadores from "./pages/Indicadores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="flex h-14 items-center px-4 gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Sistema de Gestão Contábil • Salvador/BA
                    </span>
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/faturamento" element={<Faturamento />} />
                  <Route path="/tributos" element={<Tributos />} />
                  <Route path="/notas-fiscais" element={<NotasFiscais />} />
                  <Route path="/indicadores" element={<Indicadores />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
