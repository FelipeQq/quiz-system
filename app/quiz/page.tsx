"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Home,
  XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { generateQuestions } from "../actions/quiz";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const difficulty = searchParams.get("difficulty") || "intermediario";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const getQuestions = await generateQuestions(topic, difficulty);
        setQuestions(getQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Falha ao carregar perguntas:", error);
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [topic, difficulty]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz concluído
      router.push(`/results?score=${score}&total=${questions.length}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Preparando Seu Quiz</h2>
          <p className="text-muted-foreground mb-4">
            Gerando perguntas sobre {topic}...
          </p>
          <Progress value={45} className="w-[300px]" />
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Nenhuma Pergunta Disponível</CardTitle>
            <CardDescription>
              Não conseguimos gerar perguntas para este tópico. Por favor, tente
              um tópico diferente.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8 min-h-screen flex flex-col">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-intermediario">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </div>
          <div className="text-sm font-intermediario">
            Pontuação: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          <CardDescription>
            Dificuldade{" "}
            {difficulty === "facil"
              ? "Fácil"
              : difficulty === "intermediario"
              ? "Média"
              : "Difícil"}{" "}
            · {topic}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedOption === index
                    ? isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-red-500 bg-red-50 dark:bg-red-950/20"
                      : "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <div>{option}</div>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {isAnswered &&
                    selectedOption === index &&
                    index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                </div>
              </div>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-intermediario mb-2">Explicação:</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {!isAnswered ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
            >
              Verificar Resposta
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Próxima
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Ver Resultados"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
