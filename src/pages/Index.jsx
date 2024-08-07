import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, Eye, MessageCircle, ArrowRight, Camera, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [catName, setCatName] = useState("");
  const [catStory, setCatStory] = useState("");

  const catImages = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  const catAdoptionData = [
    { month: 'Jan', adoptions: 65 },
    { month: 'Feb', adoptions: 59 },
    { month: 'Mar', adoptions: 80 },
    { month: 'Apr', adoptions: 81 },
    { month: 'May', adoptions: 56 },
    { month: 'Jun', adoptions: 55 },
    { month: 'Jul', adoptions: 40 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        if (newProgress === 100) {
          clearInterval(timer);
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (catName && catStory) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      setCatName("");
      setCatStory("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 overflow-hidden">
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
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TooltipProvider>
                <Tooltip open={showTooltip}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleLike}>
                      <Heart className="mr-2 h-4 w-4" fill={likeCount > 0 ? "red" : "none"} /> Like ({likeCount})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Congratulations! You're a true cat lover!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" /> Share Cat Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share Your Cat Photo</DialogTitle>
                  <DialogDescription>
                    Upload a photo of your feline friend to share with the community!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="photo" className="text-right">
                      Photo
                    </Label>
                    <Input id="photo" type="file" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Upload Photo</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Cat Lover Journey</h2>
          <Progress value={progress} className="w-full h-2" />
          <p className="mt-2 text-sm text-gray-600">Level: {Math.floor(progress / 20) + 1} - {progress}% Complete</p>
        </motion.div>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-5xl font-bold text-white mb-4">Discover the World of Cats</h2>
                  <p className="text-xl text-white mb-6">Explore the fascinating realm of our feline friends</p>
                  <Button variant="secondary" size="lg">
                    Start Exploring <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
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
                      { icon: Star, text: "Independent and curious nature", color: "text-yellow-500" },
                      { icon: Paw, text: "Excellent hunters with sharp claws and teeth", color: "text-green-500" },
                      { icon: Info, text: "Flexible bodies and quick reflexes", color: "text-blue-500" },
                      { icon: Eye, text: "Keen senses, especially hearing and night vision", color: "text-indigo-500" },
                      { icon: MessageCircle, text: "Complex communication through vocalizations, body language, and scent", color: "text-purple-500" }
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center bg-white rounded-lg p-3 shadow-md"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <item.icon className={`mr-3 h-6 w-6 ${item.color}`} />
                        <span className="text-gray-800">{item.text}</span>
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
                    {[
                      { name: "Siamese", origin: "Thailand" },
                      { name: "Persian", origin: "Iran" },
                      { name: "Maine Coon", origin: "United States" },
                      { name: "Bengal", origin: "United States" },
                      { name: "British Shorthair", origin: "United Kingdom" },
                      { name: "Sphynx", origin: "Canada" }
                    ].map((breed, index) => (
                      <motion.div
                        key={breed.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                          <CardTitle className="text-lg flex items-center mb-2">
                            <Paw className="mr-2 h-4 w-4 text-purple-500" />
                            {breed.name}
                          </CardTitle>
                          <Badge variant="secondary">{breed.origin}</Badge>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Cat Facts Quiz</CardTitle>
              <CardDescription>Test your knowledge about cats!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Coming soon! Stay tuned for an interactive quiz to test your cat expertise.</p>
              <Button variant="outline">Notify Me When Available</Button>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Share Your Cat's Story</CardTitle>
              <CardDescription>Tell us about your feline friend!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitStory}>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Your Cat's Name</Label>
                    <Input id="name" placeholder="Enter your cat's name" value={catName} onChange={(e) => setCatName(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="story">Your Cat's Story</Label>
                    <Textarea id="story" placeholder="Tell us about your cat" value={catStory} onChange={(e) => setCatStory(e.target.value)} />
                  </div>
                  <Button type="submit">Submit Story</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {showAlert && (
            <Alert className="mb-12">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your cat's story has been submitted successfully. Thank you for sharing!
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Cat Adoption Trends</CardTitle>
              <CardDescription>Monthly cat adoption statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={catAdoptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="adoptions" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Cat Shelters</CardTitle>
              <CardDescription>Help cats in need find loving homes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your donation can make a difference in the lives of cats waiting for their forever homes.</p>
              <Button variant="outline">
                <Gift className="mr-2 h-4 w-4" /> Make a Donation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
