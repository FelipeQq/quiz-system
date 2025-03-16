export const config = {
  maxDuration: 55, // Define um tempo limite maior
};

import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY, // Chave da API armazenada em variáveis de ambiente
});

export async function POST(req: NextRequest) {
  const { topic, difficulty } = await req.json();

  console.log("Gerando perguntas para:", topic, difficulty);

  try {
    const prompt = `
      Gere 5 perguntas de múltipla escolha sobre ${topic} com nível de dificuldade ${difficulty} para estudantes de medicina.
      Cada pergunta deve ter 4 opções com apenas uma resposta correta.
      Inclua uma explicação para a resposta correta.
      Formate a resposta **APENAS COMO UM ARRAY JSON**, sem texto adicional, seguindo a estrutura abaixo:
      [
        {
          "question": "Texto da pergunta",
          "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
          "correctAnswer": 0, // Índice da opção correta (0-3)
          "explanation": "Explicação de por que esta é a resposta correta"
        }
      ]
    `;

    // Em uma implementação real, você usaria:
    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      prompt: prompt,
      temperature: 0.1,
    });

    const handlerText = text.replace(/^```json|```$/g, "");

    // Verifica se o texto é uma string JSON válida
    if (
      typeof handlerText !== "string" ||
      !handlerText.trim().startsWith("[")
    ) {
      throw new Error("Resposta do modelo não é um JSON válido.");
    }

    // Converte o texto para um array de objetos
    const parsedQuestions = JSON.parse(handlerText);

    // Valida se o resultado é um array e se cada item tem a estrutura esperada
    if (!Array.isArray(parsedQuestions)) {
      throw new Error("Resposta do modelo não é um array JSON.");
    }

    for (const question of parsedQuestions) {
      if (
        !question.question ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        typeof question.correctAnswer !== "number" ||
        !question.explanation
      ) {
        throw new Error("Estrutura de pergunta inválida no JSON retornado.");
      }
    }

    return NextResponse.json(parsedQuestions);
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error);
    return NextResponse.json(
      { message: "Erro ao gerar perguntas" },
      { status: 500 }
    );
  }
}
