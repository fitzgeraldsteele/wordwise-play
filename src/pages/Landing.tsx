import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Shuffle, Hand } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold font-display text-white mb-6 tracking-tight">
            Word Families
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Interactive phonics practice for your classroom
          </p>
          <Link to="/setup">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-12 py-6 text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Teaching
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                No Setup Required
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Jump straight into teaching. Select word families and begin your lesson instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shuffle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Random Order Each Time
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Words are shuffled within each family to prevent memorization and encourage true learning.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Hand className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Touch & Keyboard Ready
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Perfect for interactive whiteboards, tablets, or traditional computers with keyboard navigation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 mb-16">
          <p className="text-white/80 text-lg">
            Perfect for K-2 teachers • Large, projection-friendly text • Accessible design
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}