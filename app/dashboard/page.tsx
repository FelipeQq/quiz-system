"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, Brain, LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediario");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    // Em um app real, passaríamos esses parâmetros para a página do quiz
    setTimeout(() => {
      router.push(
        `/quiz?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`
      );
    }, 500);
  };

  const handleLogout = () => {
    // Em um app real, isso limparia o estado de autenticação
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground">
            MedQuiz
          </h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-primary-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Bem-vindo ao MedQuiz</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Iniciar um Novo Quiz
              </CardTitle>
              <CardDescription>
                Escolha um tópico e nível de dificuldade para começar sua sessão
                de estudo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Tópico de Estudo</Label>
                <Input
                  id="topic"
                  placeholder="ex: Anatomia Humana, Cardiologia, Neurologia"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Nível de Dificuldade</Label>
                <RadioGroup
                  value={difficulty}
                  onValueChange={setDifficulty}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="facil" id="facil" />
                    <Label htmlFor="facil" className="font-normal">
                      Fácil
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediario" id="intermediario" />
                    <Label htmlFor="intermediario" className="font-normal">
                      Médio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dificil" id="dificil" />
                    <Label htmlFor="dificil" className="font-normal">
                      Difícil
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartQuiz}
                disabled={!topic.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? "Preparando Quiz..." : "Iniciar Quiz"}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Dicas de Estudo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Concentre-se em um tópico por vez para uma compreensão mais
                    profunda
                  </li>
                  <li>
                    Revise as respostas incorretas para melhorar a retenção
                  </li>
                  <li>
                    Aumente gradualmente a dificuldade conforme você progride
                  </li>
                  <li>Faça pausas regulares para evitar fadiga mental</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tópicos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  Seus tópicos de estudo recentes aparecerão aqui
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
