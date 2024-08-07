import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info } from "lucide-react";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Cat className="mr-2" /> Feline Fascination
          </h1>
          <Button variant="outline" onClick={() => setLikeCount(likeCount + 1)}>
            <Heart className="mr-2 h-4 w-4" /> Like ({likeCount})
          </Button>
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
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Cute cat" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-5xl font-bold text-white text-center">Discover the World of Cats</h2>
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
                  <ul className="space-y-2">
                    <li className="flex items-center"><Info className="mr-2 h-4 w-4" /> Independent and curious nature</li>
                    <li className="flex items-center"><Info className="mr-2 h-4 w-4" /> Excellent hunters with sharp claws and teeth</li>
                    <li className="flex items-center"><Info className="mr-2 h-4 w-4" /> Flexible bodies and quick reflexes</li>
                    <li className="flex items-center"><Info className="mr-2 h-4 w-4" /> Keen senses, especially hearing and night vision</li>
                    <li className="flex items-center"><Info className="mr-2 h-4 w-4" /> Complex communication through vocalizations, body language, and scent</li>
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
                  <div className="grid grid-cols-2 gap-4">
                    {["Siamese", "Persian", "Maine Coon", "Bengal", "British Shorthair"].map((breed) => (
                      <Card key={breed} className="p-4 hover:shadow-lg transition-shadow">
                        <CardTitle className="text-lg">{breed}</CardTitle>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
