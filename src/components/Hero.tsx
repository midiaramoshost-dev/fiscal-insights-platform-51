
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, BookOpen, TrendingUp } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Nova Legislação do ICMS-SP",
      subtitle: "Alterações importantes para 2024",
      description: "Conheça as principais mudanças na legislação do ICMS de São Paulo que entram em vigor este ano.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "Legislação",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Curso: eSocial Avançado",
      subtitle: "Domine todas as funcionalidades",
      description: "Aprenda a usar o eSocial de forma completa com nosso curso prático e atualizado.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "Curso",
      color: "bg-emerald-600"
    },
    {
      id: 3,
      title: "Simulador de Regime Tributário",
      subtitle: "Ferramenta gratuita para assinantes",
      description: "Compare diferentes regimes tributários e encontre o mais vantajoso para sua empresa.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "Ferramenta",
      color: "bg-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl">
                    <Badge className={`${slide.color} text-white mb-3`}>
                      {slide.type === "Curso" && <BookOpen className="w-3 h-3 mr-1" />}
                      {slide.type === "Legislação" && <TrendingUp className="w-3 h-3 mr-1" />}
                      {slide.type === "Ferramenta" && <Play className="w-3 h-3 mr-1" />}
                      {slide.type}
                    </Badge>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {slide.title}
                    </h2>
                    
                    <p className="text-xl text-blue-100 mb-3">
                      {slide.subtitle}
                    </p>
                    
                    <p className="text-slate-200 mb-6 leading-relaxed">
                      {slide.description}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                      >
                        Saiba Mais
                      </Button>
                      
                      {slide.type === "Curso" && (
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                          <Play className="w-4 h-4 mr-2" />
                          Assistir Preview
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="ml-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="mr-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
