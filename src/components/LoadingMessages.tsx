import { useState, useEffect } from "react";
import { Sparkles, Search, Target, Zap, Database, CheckCircle, Coffee, Rocket, Brain } from "lucide-react";

interface LoadingMessagesProps {
  isVisible: boolean;
}

interface LoadingStage {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  duration: number; // in seconds
}

const loadingStages: LoadingStage[] = [
  {
    title: "Discovering leads for you...",
    subtitle: "Searching across databases and the web",
    icon: <Search className="h-10 w-10 text-emerald-400" />,
    duration: 15,
  },
  {
    title: "Gathering company information...",
    subtitle: "Cross-referencing multiple data sources",
    icon: <Database className="h-10 w-10 text-cyan-400" />,
    duration: 15,
  },
  {
    title: "Sharpen your pencils and keep your phones ready!",
    subtitle: "Enriching contacts with emails and phone numbers",
    icon: <Zap className="h-10 w-10 text-yellow-400" />,
    duration: 30,
  },
  {
    title: "Any minute now...",
    subtitle: "Verifying leads against Salesforce records",
    icon: <CheckCircle className="h-10 w-10 text-blue-400" />,
    duration: 30,
  },
  {
    title: "Almost there, worth the wait!",
    subtitle: "Scoring and ranking your best matches",
    icon: <Target className="h-10 w-10 text-emerald-400" />,
    duration: 30,
  },
  {
    title: "Hang tight, magic in progress...",
    subtitle: "Our AI is working hard to find the perfect leads",
    icon: <Brain className="h-10 w-10 text-purple-400" />,
    duration: 30,
  },
  {
    title: "Great things take time!",
    subtitle: "Preparing your personalized lead recommendations",
    icon: <Rocket className="h-10 w-10 text-orange-400" />,
    duration: 30,
  },
  {
    title: "You're going to love these leads!",
    subtitle: "Final touches on your results",
    icon: <Coffee className="h-10 w-10 text-amber-400" />,
    duration: 60,
  },
];

const funFacts = [
  "💡 Did you know? Our AI analyzes 100+ signals per lead.",
  "🎯 Pro tip: More specific searches yield better results!",
  "⚡ Fun fact: We check live hiring data to find active buyers.",
  "🌟 Our leads have 3x higher conversion rates than cold lists.",
  "🔍 We're searching through millions of companies for you.",
  "📊 Each lead is scored on 15+ buying intent signals.",
  "🚀 Quality over quantity - we find the best matches first.",
  "💼 Our data is refreshed daily from 50+ sources.",
];

export function LoadingMessages({ isVisible }: LoadingMessagesProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [funFact, setFunFact] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStageIndex(0);
      setElapsedTime(0);
      setProgress(0);
      return;
    }

    // Pick random fun fact
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    // Calculate which stage we should be at based on elapsed time
    let totalTime = 0;
    for (let i = 0; i < loadingStages.length; i++) {
      totalTime += loadingStages[i].duration;
      if (elapsedTime < totalTime) {
        setCurrentStageIndex(i);
        break;
      }
    }

    // If we've exceeded all stages, stay on the last one
    if (elapsedTime >= loadingStages.reduce((sum, s) => sum + s.duration, 0)) {
      setCurrentStageIndex(loadingStages.length - 1);
    }

    // Calculate progress within current stage for animation
    let timeBeforeCurrentStage = 0;
    for (let i = 0; i < currentStageIndex; i++) {
      timeBeforeCurrentStage += loadingStages[i].duration;
    }
    const timeInCurrentStage = elapsedTime - timeBeforeCurrentStage;
    const stageProgress = Math.min(
      (timeInCurrentStage / loadingStages[currentStageIndex].duration) * 100,
      100
    );
    setProgress(stageProgress);
  }, [elapsedTime, currentStageIndex]);

  // Change fun fact every 20 seconds
  useEffect(() => {
    if (!isVisible) return;

    const factInterval = setInterval(() => {
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 20000);

    return () => clearInterval(factInterval);
  }, [isVisible]);

  if (!isVisible) return null;

  const currentStage = loadingStages[currentStageIndex];
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="text-center py-16 animate-in fade-in duration-300">
      {/* Main Loading Animation */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full animate-ping" />
          
          {/* Middle ring */}
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full flex items-center justify-center">
            {/* Inner spinning ring */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-400/30 animate-spin" style={{ animationDuration: '8s' }} />
            
            {/* Icon container with glow */}
            <div className="relative z-10 animate-pulse">
              {currentStage.icon}
            </div>
          </div>
          
          {/* Sparkles decoration */}
          <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-emerald-400 animate-bounce" />
          <Sparkles className="absolute -bottom-1 -left-2 h-4 w-4 text-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-bold text-foreground mb-3 transition-all duration-500">
        {currentStage.title}
      </h2>
      <p className="text-muted-foreground mb-6 transition-all duration-500">
        {currentStage.subtitle}
      </p>

      {/* Progress indicator */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Processing</span>
          <span className="font-mono">
            {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${Math.min(((currentStageIndex / loadingStages.length) * 100) + (progress / loadingStages.length), 95)}%` 
            }}
          />
        </div>
      </div>

      {/* Stage dots */}
      <div className="flex justify-center gap-2 mb-8">
        {loadingStages.slice(0, 5).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < currentStageIndex
                ? "bg-emerald-400"
                : index === currentStageIndex
                ? "bg-emerald-400 animate-pulse scale-125"
                : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {/* Fun fact */}
      <div className="max-w-lg mx-auto">
        <div className="bg-secondary/50 rounded-xl px-6 py-4 border border-border">
          <p className="text-sm text-muted-foreground animate-in fade-in duration-500">
            {funFact}
          </p>
        </div>
      </div>

      {/* Time disclaimer for long waits */}
      {elapsedTime > 90 && (
        <p className="text-xs text-muted-foreground/70 mt-6 animate-in fade-in duration-500">
          Our thorough research ensures high-quality leads. Thank you for your patience! 🙏
        </p>
      )}
    </div>
  );
}
