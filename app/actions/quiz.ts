"use server";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export async function generateQuestions(
  topic: string,
  difficulty: string
): Promise<Question[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          difficulty,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao gerar perguntas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error);
    throw new Error("Falha ao gerar perguntas. Por favor, tente novamente.");
  }
}
