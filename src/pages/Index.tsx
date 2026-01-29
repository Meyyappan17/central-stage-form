import ServiceRequestForm from "@/components/ServiceRequestForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">

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
            © 2025 Leads Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
