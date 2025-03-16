import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground">MedQuiz</h1>
          <nav>
            <Link href="/login">
              <Button variant="secondary">Entrar</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Aprimore Seu Conhecimento Médico</h2>
          <p className="text-xl text-muted-foreground">
            Uma plataforma de quiz com IA projetada especificamente para estudantes de medicina
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Aprendizado Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Escolha seu nível de dificuldade e estude tópicos que são importantes para você</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Perguntas Geradas por IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Obtenha perguntas únicas adaptadas aos seus tópicos médicos selecionados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Instantâneo</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Receba explicações detalhadas para cada resposta para melhorar sua compreensão</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MedQuiz. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

