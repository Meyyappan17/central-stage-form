import ServiceRequestForm from "@/components/ServiceRequestForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-foreground">ServicePro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Sign in
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get help with any project
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Describe what you need and we'll connect you with trusted local professionals.
          </p>
        </div>

        <ServiceRequestForm />
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ServicePro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
