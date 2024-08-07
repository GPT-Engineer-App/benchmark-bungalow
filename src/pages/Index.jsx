import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(13);

  const catImages = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-2" /> Feline Fascination
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="outline" onClick={() => setLikeCount(likeCount + 1)}>
              <Heart className="mr-2 h-4 w-4" fill={likeCount > 0 ? "red" : "none"} /> Like ({likeCount})
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-12 overflow-hidden">
            <div className="relative h-96">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={catImages[currentImageIndex]}
                  alt="Cute cat" 
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <motion.h2 
                  className="text-5xl font-bold text-white text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Discover the World of Cats
                </motion.h2>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="characteristics" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle>Fascinating Feline Features</CardTitle>
                  <CardDescription>What makes cats truly unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { icon: Star, text: "Independent and curious nature" },
                      { icon: Paw, text: "Excellent hunters with sharp claws and teeth" },
                      { icon: Info, text: "Flexible bodies and quick reflexes" },
                      { icon: Eye, text: "Keen senses, especially hearing and night vision" },
                      { icon: MessageCircle, text: "Complex communication through vocalizations, body language, and scent" }
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <item.icon className="mr-2 h-5 w-5 text-purple-500" />
                        {item.text}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card>
                <CardHeader>
                  <CardTitle>Diverse Cat Breeds</CardTitle>
                  <CardDescription>Explore some popular cat breeds from around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Siamese", "Persian", "Maine Coon", "Bengal", "British Shorthair", "Sphynx"].map((breed, index) => (
                      <motion.div
                        key={breed}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                          <CardTitle className="text-lg flex items-center">
                            <Paw className="mr-2 h-4 w-4 text-purple-500" />
                            {breed}
                          </CardTitle>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Cat Lover Progress</CardTitle>
              <CardDescription>Track your journey to becoming the ultimate cat enthusiast!</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">You're {progress}% on your way to ultimate cat expertise!</p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
