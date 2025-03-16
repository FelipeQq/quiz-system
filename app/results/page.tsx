"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BarChart, BookOpen, Home, RefreshCw } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "0")

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  let message = ""
  let color = ""

  if (percentage >= 90) {
    message = "Excelente! Você dominou este tópico."
    color = "text-green-500"
  } else if (percentage >= 70) {
    message = "Bom trabalho! Você tem uma compreensão sólida."
    color = "text-blue-500"
  } else if (percentage >= 50) {
    message = "Não está mal! Continue praticando para melhorar."
    color = "text-yellow-500"
  } else {
    message = "Você precisa praticar mais com este tópico."
    color = "text-red-500"
  }

  return (
    <div className="container max-w-2xl py-12 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Resultados do Quiz</CardTitle>
          <CardDescription>Veja como você se saiu e onde pode melhorar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-muted">
              <Award className="absolute text-primary w-full h-full p-6" />
              <span className="text-4xl font-bold">{percentage}%</span>
            </div>
            <h3 className={`mt-6 text-xl font-semibold ${color}`}>{message}</h3>
            <p className="mt-2 text-center">
              Você acertou {score} de {total} perguntas.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <BarChart className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Desempenho</h3>
              <p className="text-sm text-center text-muted-foreground">
                {percentage >= 70 ? "Você está se saindo bem nesta área!" : "Este tópico precisa de mais atenção."}
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Recomendação de Estudo</h3>
              <p className="text-sm text-center text-muted-foreground">
                {percentage >= 70
                  ? "Avance para tópicos mais avançados."
                  : "Revise os conceitos básicos e tente novamente."}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-1/2" onClick={() => router.push("/dashboard")}>
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Button>
          <Button className="w-full sm:w-1/2" onClick={() => router.back()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

